import axios from 'axios'

const baseURL = "http://localhost:8082/trackitem/api/v1/items"


const AddItem = async (item: any) => {
  console.log("Item data:", item);
  try{
    const response = await axios.post(baseURL, item);  // Don't manually set Content-Type header
  return response;
  }catch(error){
    console.error("Failed to add the item",error);
    throw error
  }
};

const GetItemById = async (itemId:string) => {
   //get the items
      try{
        const response = await  axios.get(  `${baseURL}?itemId=${itemId}`)
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
}

const GetAllItems = async () => {
   //get the items
      try{
        const response = await  axios.get(`${baseURL}/getAllItems`)
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
        `${baseURL}?itemId=${itemId}`);
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
        st
        );
    console.log(response)
    return response;
    
  }catch(error){
      console.error("Failed to get the data",error);
      throw error
  }   
}

export{GetAllItems,AddItem,GetItemById,DeleteItem,FoundItem}