import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; 


const authApi = axios.create({
  baseURL: API_URL,  // Base URL is automatically fetched from .env
  headers: {
    "Content-Type": "application/json",
  },
});


export const signupUser = async (username: string, email: string, password: string) => {
  try {
    const { data } = await authApi.post("/auth/signup/", { username, email, password });
    return data;
  } catch (error: any) {
    const errorMessage = axios.isAxiosError(error) && error.response
      ? error.response.data.detail
      : "An unexpected error occurred";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await authApi.post("/auth/login/", {
      email: email,       // Ensure you're sending the correct fields in the request body
      password: password, // Make sure both fields are included in the request body
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = axios.isAxiosError(error) && error.response
      ? error.response.data.detail
      : "An unexpected error occurred";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const logoutUser = async (token: string) => {
  try {
    // Send logout request with token as query parameter
    const response = await authApi.post(
      `/auth/logout/?token=${token}`,  // Token sent as query parameter
      {},  // No body needed for logout
      {
        headers: {
          "Content-Type": "application/json", // Ensure correct content type
        },
      }
    );
    return response.data; // Return response message
  } catch (error: any) {
    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? error.response.data.detail
        : "An unexpected error occurred during logout";
    console.error("Logout error:", errorMessage);
    throw new Error(errorMessage); // Throw error for further handling in component
  }
};
