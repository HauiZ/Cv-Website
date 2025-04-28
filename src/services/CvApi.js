import axios from "../utils/axios.customize";


const fetchTemplateApi = async () => {
  const res = await axios.get("/admin/getTemplateCV");
  const data = res.data
  return data; 
}
export {fetchTemplateApi}