import axios from 'axios'

const baseURL = "http://localhost:8082/trackitem/api/v1/users"

const fetchToken = () => {
  const token = localStorage.getItem("trackMyItemToken")
  return "Bearer " + token
}

const GetUserById = async (userId:string) => {
   //get the items
      try{
        const response = await  axios.get(  `${baseURL}?userId=${userId}`,
      {
        headers: {
          Authorization: fetchToken()
        }
      })
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
}
export {GetUserById}