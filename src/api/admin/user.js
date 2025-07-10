const BASE_URL = "https://ecommerce-backend-q3ag.onrender.com/api/v1";
import axios from "axios";

export const getAllUsers = async () => {
  try {
    const allUsers = await axios.get(`${BASE_URL}/user`);
    return allUsers;
  } catch (error) {
    console.log("failed to fatching categories");
  }
};

export const getSingleUser = async (id) => {
  try {
    const singleUsers = await axios.get(`${BASE_URL}/user/${id}`);
    return singleUsers;
  } catch (error) {
    console.log("failed to fatching categories");
  }
};
