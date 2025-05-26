import axios from 'axios'

const baseURL = "http://localhost:8082/trackitem/api/v1/items"

const fetchToken = () => {
  const token = localStorage.getItem("trackMyItemToken")
  return "Bearer " + token
}

const AddItem = async (item: any) => {
  console.log("Item data:", item);
  try{
    const response = await axios.post(baseURL, item,{
        headers: {
          Authorization: fetchToken()
        }
      });  // Don't manually set Content-Type header
  return response;
  }catch(error){
    console.error("Failed to add the item",error);
    throw error
  }
};

const GetItemById = async (itemId:string) => {
   //get the items
      try{
        const response = await  axios.get(  `${baseURL}?itemId=${itemId}`,
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

const GetAllItems = async () => {
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

const DeleteItem = async(itemId :any) =>{
  try{
    console.log(itemId)
    const response  =  await axios.delete(
        `${baseURL}?itemId=${itemId}`,
      {
        headers: {
          Authorization: fetchToken()
        }
      });
    console.log(response.data)
    return response;
    
  }catch(error){
      console.error("Failed to delete the data",error);
      throw error
  }
}

const FoundItem = async(itemId :any,status:any) =>{
  interface AllItem {
  itemStatus: string;
}

  const st: AllItem = {
    itemStatus: status
  }
  try{
    const response  =  await axios.patch(
        `${baseURL}?itemId=${itemId}`,
        st,
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

export{GetAllItems,AddItem,GetItemById,DeleteItem,FoundItem}