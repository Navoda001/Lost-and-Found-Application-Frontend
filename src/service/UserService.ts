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

export {AddUser}