const BASE_URL = "http://localhost:3000/api/v1";
import axios from "axios";

export const getAllProducts = async () => {
  try {
    const allProducts = await axios.get(`${BASE_URL}/product/all`);
    return allProducts;
  } catch (error) {
    console.log("failed to fatching categories");
  }
};
export const getSingleProduct = async (id) => {
  try {
    const singleProduct = await axios.get(`${BASE_URL}/product/${id}`);
    return singleProduct;
  } catch (error) {
    console.log("failed to fatching categories");
  }
};

export const AddNewProduct = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/product/create`, data, {
      withCredentials: true,
      // no manual content-type header here!
    });
    console.log(data);
    return res;
  } catch (error) {
    console.log("Failed to Creating Category", error.response?.data || error);
    throw error;
  }
};

export const deleteSelectedProduct = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/product/delete/${id}`, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log("Failed to Deleting Category", error.response?.data || error);
    throw error;
  }
};

export const UpdateTheProduct = async (formData, productId) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/product/update/${productId}`,
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
