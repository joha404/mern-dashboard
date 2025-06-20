const BASE_URL = "http://localhost:3000/api/v1";
import axios from "axios";

export const getAllCategory = async () => {
  try {
    const allCategory = await axios.get(`${BASE_URL}/category/all`);
    return allCategory;
  } catch (error) {
    console.log("failed to fatching categories");
  }
};

export const createCategory = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/category/create`, data, {
      withCredentials: true,
      // no manual content-type header here!
    });
    return res;
  } catch (error) {
    console.log("Failed to Creating Category", error.response?.data || error);
    throw error;
  }
};

export const deleteSelectedCategory = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/category/delete`, {
      data: { id: id },
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log("Failed to Deleting Category", error.response?.data || error);
    throw error;
  }
};

export const UpdateTheCategory = async (formData, categoryId) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/category/update/${categoryId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.error("Failed to update category:", error.response?.data || error);
    throw error;
  }
};
