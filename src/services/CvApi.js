import instance from "../utils/axios.customize";
import axios from "../utils/axios.customize";


const fetchTemplateAdminApi = async () => {
  const res = await axios.get("/admin/getTemplateCV");
  const data = res.data
  return data; 
}
const fetchTemplateUserApi = async () => {
  const res = await axios.get("/users/getTemplateCV");
  const data = res.data
  return data; 
}
const createTemplateCVApi = (formData) => {
  return instance.post("/admin/uploadCvTemplate", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export {fetchTemplateAdminApi,fetchTemplateUserApi, createTemplateCVApi}