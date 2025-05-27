import axios from 'axios'

const baseURL = "http://localhost:8082/trackitem/api/v1/staffs"

const fetchToken = () => {
  const token = localStorage.getItem("trackMyItemToken")
  return "Bearer " + token
}

const AddStaffMember = async (staff: any) => {
  try{
    const response = await axios.post(baseURL, staff,{
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

const GetStaffById = async (staffId: string) => {
  //get the items
  try {
    const response = await axios.get(`${baseURL}?staffId=${staffId}`,
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

const GetStaffByEmail = async (email: string) => {
  //get the items
  try {
    const response = await axios.get(`${baseURL}/getStaffByEmail?email=${email}`,
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

const UpdateStaff = async (newStaffData: any) => {
  try {
    const response = await axios.patch(`${baseURL}/update-staff`, newStaffData, {
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

const UpdateStaffImage = async (staffImage: any) => {
  try {
    const response = await axios.patch(`${baseURL}/update-image`, staffImage, {
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

export { GetStaffById, GetStaffByEmail, UpdateStaff, UpdateStaffImage,AddStaffMember }