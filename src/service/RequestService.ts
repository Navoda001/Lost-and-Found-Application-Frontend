import axios from 'axios'

const baseURL = "http://localhost:8082/trackitem/api/v1/requests"

const fetchToken = () => {
  const token = localStorage.getItem("trackMyItemToken")
  return "Bearer " + token
}

const AddRequest = async (request: any) => {
  console.log("Item data:", request);
  try{
    const response = await axios.post(baseURL, request,
      {
        headers: {
          Authorization: fetchToken()
        }
      });  
  return response;
  }catch(error){
    console.error("Failed to add the item",error);
    throw error
  }
};

const GetRequestById = async (requestId:string) => {
   //get the items
      try{
        const response = await  axios.get(  `${baseURL}?requestId=${requestId}`,
      {
        headers: {
          Authorization: fetchToken()
        }
      });
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
}

const GetAllRequestsByItemId = async (itemId:string) => {
   //get the items
      try{
        const response = await  axios.get(  `${baseURL}/getRequestsByItemId?itemId=${itemId}`,
      {
        headers: {
          Authorization: fetchToken()
        }
      });
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
}

const GetAllRequestsByEmail = async (email:string) => {
   //get the items
      try{
        const response = await  axios.get(  `${baseURL}/getRequestsByEmail?email=${email}`,
      {
        headers: {
          Authorization: fetchToken()
        }
      });
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
}

const GetAllRequestItems = async () => {
   //get the items
      try{
        const response = await  axios.get(`${baseURL}/getAllItems`,
      {
        headers: {
          Authorization: fetchToken()
        }
      });
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
}

const UpdateRequest = async(requestId :any,request:any) =>{

  try{
    const response  =  await axios.patch(
        `${baseURL}?requestId=${requestId}`,
        request,
      {
        headers: {
          Authorization: fetchToken()
        }
      }
        );
    console.log(response)
    return response;
    
  }catch(error){
      console.error("Failed to get the data",error);
      throw error
  }   
}

export{AddRequest,GetRequestById,GetAllRequestItems,GetAllRequestsByItemId,UpdateRequest,GetAllRequestsByEmail}