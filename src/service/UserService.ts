import axios from 'axios'

const baseURL = "http://localhost:8082/trackitem/api/v1/users"

const AddUser = async (user: any) => {
  try{
    const response = await axios.post(baseURL, user); 
  return response;
  }catch(error){
    console.error("Failed to add the item",error);
    throw error
  }
};

const GetUserById = async (userId:string) => {
   //get the items
      try{
        const response = await  axios.get(  `${baseURL}?userId=${userId}`)
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
}
export {AddUser,GetUserById}