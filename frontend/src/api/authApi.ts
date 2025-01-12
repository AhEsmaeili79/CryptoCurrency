import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; 


const authApi = axios.create({
  baseURL: API_URL, 
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
      email: email,       
      password: password, 
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
    const response = await authApi.post(
      `/auth/logout/?token=${token}`,  
      {},  
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );
    return response.data; 
  } catch (error: any) {
    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? error.response.data.detail
        : "An unexpected error occurred during logout";
    console.error("Logout error:", errorMessage);
    throw new Error(errorMessage); 
  }
};
