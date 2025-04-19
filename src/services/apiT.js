import { provinceData, districtData } from './provice';

// Modified to work with useCustomFetch
const fetchProvinces = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log("Fetching provinces from local data");
  
  // Return formatted data for dropdown
  return provinceData.map((item) => ({
    label: item.name,
    value: item.code,
  }));
};

const fetchDistrictsByProvinceCode = async (provinceCode) => {
  // Return empty array if no province code
  if (!provinceCode) return [];
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log("Fetching districts for province code:", provinceCode);
  
  // Get districts for the selected province, or empty array if not found
  const districts = districtData[provinceCode] || [];
  
  // Return formatted data for dropdown
  return districts.map((item) => ({
    label: item.name,
    value: item.code,
  }));
};

export { fetchProvinces, fetchDistrictsByProvinceCode };