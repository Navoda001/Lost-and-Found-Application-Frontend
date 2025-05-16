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

const GetRequestById = async (requestId:string) => {
   //get the items
      try{
        const response = await  axios.get(  `${baseURL}?requestId=${requestId}`)
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
}

const GetAllRequestsByIdItemId = async (itemId:string) => {
   //get the items
      try{
        const response = await  axios.get(  `${baseURL}/getRequestsByItemId?itemId=${itemId}`)
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
}

const GetAllRequestItems = async () => {
   //get the items
      try{
        const response = await  axios.get(`${baseURL}/getAllItems`)
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
}

export{AddRequest,GetRequestById,GetAllRequestItems,GetAllRequestsByIdItemId}