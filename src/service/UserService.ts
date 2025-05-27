import axios from 'axios'

const baseURL = "http://localhost:8082/trackitem/api/v1/users"

const fetchToken = () => {
  const token = localStorage.getItem("trackMyItemToken")
  return "Bearer " + token
}

const GetUserById = async (userId: string) => {
  //get the items
  try {
    const response = await axios.get(`${baseURL}?userId=${userId}`,
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

const GetUserByEmail = async (email: string) => {
  //get the items
  try {
    const response = await axios.get(`${baseURL}/getUserByEmail?email=${email}`,
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

const UpdateUser = async (newUserData: any) => {
  try {
    const response = await axios.patch(`${baseURL}/update-user`, newUserData, {
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

const UpdateUserImage = async (userImage: any) => {
  try {
    const response = await axios.patch(`${baseURL}/update-image`, userImage, {
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

export { GetUserById, GetUserByEmail, UpdateUser, UpdateUserImage }