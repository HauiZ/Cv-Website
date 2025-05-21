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
const createTemplateCVApi = async (formData) => {
  return await instance.post("/admin/uploadCvTemplate", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const updateTemplateCVApi = async (formData, id) => {
  return await instance.post(`/admin/updateCvTemplate/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const deleteTemplateCVApi = async (idTemplate) =>{
  const res = await axios.delete(`/admin/deleteTemplate/${idTemplate}`);
  return res.data;
}
export {fetchTemplateAdminApi,fetchTemplateUserApi, createTemplateCVApi, deleteTemplateCVApi, updateTemplateCVApi}