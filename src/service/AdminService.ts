import axios from 'axios'

const baseURL = "http://localhost:8082/trackitem/api/v1/admins"

const fetchToken = () => {
  const token = localStorage.getItem("trackMyItemToken")
  return "Bearer " + token
}

const GetAdminById = async (adminId: string) => {
  //get the items
  try {
    const response = await axios.get(`${baseURL}?adminId=${adminId}`,
      {
        headers: {
          Authorization: fetchToken()
        }
      })
    return response.data
  } catch (error) {
    console.error("Failed to get the data", error);
    throw error
  }
}

const GetAdminByEmail = async (email: string) => {
  //get the items
  try {
    const response = await axios.get(`${baseURL}/getAdminByEmail?email=${email}`,
      {
        headers: {
          Authorization: fetchToken()
        }
      })
    return response.data
  } catch (error) {
    console.error("Failed to get the data", error);
    throw error
  }
}

const UpdateAdmin = async (newAdminData: any) => {
  try {
    const response = await axios.patch(`${baseURL}`, newAdminData, {
      headers: {
        Authorization: fetchToken()
      }
    });
    return response;
  } catch (error) {
    console.error("Failed to update", error);
    throw error
  }
};
export { GetAdminById, GetAdminByEmail, UpdateAdmin }