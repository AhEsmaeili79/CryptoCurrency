// src/api/authApi.ts

const API_URL = "http://localhost:8000/api/users"; // Replace with your Django API URL

// Signup user
export const signupUser = async (username: string, email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Signup failed");
    }

    const data = await response.json();
    return data; // Contains 'access' and 'refresh' tokens
  } catch (error) {
    throw new Error(error.message || "Signup failed");
  }
};

// Login user
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username, // Using username for login as per your requirement
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    const data = await response.json();
    return data; // Contains 'access' and 'refresh' tokens
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};


export const logoutUser = () => {
  // Simply remove the access token from localStorage to log the user out
  localStorage.removeItem("access_token");
};