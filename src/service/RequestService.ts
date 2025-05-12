import axios from 'axios'

const baseURL = "http://localhost:8082/trackitem/api/v1/requests"

const AddRequest = async (request: any) => {
  console.log("Item data:", request);
  try{
    const response = await axios.post(baseURL, request);  // Don't manually set Content-Type header
  return response;
  }catch(error){
    console.error("Failed to add the item",error);
    throw error
  }
};

export{AddRequest}