import { a } from "react-spring";
import axios from "../utils/axios.customize";

const fetchRecruitmentNewsDetailApi = async (newsId) => {
  if (!newsId) {
    throw new Error("NewsId is required");
  }

  try {
    const res = await axios.get(
      `/recruitmentNews/getDetailRecruitmentNews/${newsId}`
    );

    if (!res?.data) {
      throw new Error("Không thể tải thông tin tin tuyển dụng");
    }

    const job = res.data;

    // Process array fields if they exist and ensure they are strings
    const processTextArray = (field) => {
      if (!field) return "";
      return Array.isArray(field) ? field.join("\n") : String(field);
    };    // Process data from backend structure to match frontend needs
    const processedData = {
      // Job basic information
      jobTitle: job.introduce?.jobTitle || "",
      profession: job.detailRecruitment?.profession || "",
      candidateNumber: job.general?.candidateNumber || "",
      jobLevel: job.general?.jobLevel || "",
      workType: job.general?.workType || "",
      degree: job.detailRecruitment?.degree || "",
      jobAddress: job.detailRecruitment?.jobAddress || "",

      // Experience and deadlines
      experience: job.introduce?.experience || "",
      workDateIn: job.detailRecruitment?.workDateIn || "",
      applicationDeadline: job.introduce?.applicationDeadline || "",
      applicationDeadlineDate: job.introduce?.applicationDeadlineDate || "",
      datePosted: job.detailRecruitment?.datePosted || "",

      // Location information
      province: job.introduce.address || "",
      district: job.introduce.district || "",  // Add if available in backend

      // Job details
      workDetail: processTextArray(job.detailRecruitment?.workDetail),
      jobRequirements: processTextArray(job.detailRecruitment?.jobRequirements),
      benefits: processTextArray(job.detailRecruitment?.benefits),

      // Contact information
      contactInfo: job.detailRecruitment?.contactInfo || "",
      contactAddress: job.detailRecruitment?.contactAddress || "",
      contactPhone: job.detailRecruitment?.contactPhone || "",
      contactEmail: job.detailRecruitment?.contactEmail || "",

      // Additional fields
      videoUrl: job.detailRecruitment?.videoUrl || "",
      salaryNegotiable: Boolean(job.detailRecruitment?.salaryNegotiable),


    };    // Handle salary range
    if (job.introduce?.salaryRange) {
      const [min, max] = job.introduce.salaryRange.split("-").map(s => s.trim());
      processedData.salaryMin = min || "";
      processedData.salaryMax = max || "";
    } else {
      processedData.salaryMin = "";
      processedData.salaryMax = "";
    }

    // Validate critical fields
    if (!processedData.jobTitle || !processedData.jobAddress) {
      console.error('Missing required fields:', {
        jobTitle: processedData.jobTitle,
        jobAddress: processedData.jobAddress
      });
    }

    return processedData;
  } catch (error) {
    console.error("Error in fetchRecruitmentNewsDetailApi:", error);
    throw error;
  }
};
const fetchAllNewsApi = async () => {
  const res = await axios.get("/recruitmentNews/getRecruitmentNews");
  const data = res.data;
  return data;
};
const fetchAllNewsFilterApi = async (params) => {
  const res = await axios.get("/recruitmentNews/filterRecruitmentNews", {
    params: params,
  });

  const data = res.data;
  return data;
};

export {
  fetchRecruitmentNewsDetailApi,
  fetchAllNewsApi,
  fetchAllNewsFilterApi,
};