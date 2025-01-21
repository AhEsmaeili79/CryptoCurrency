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


export const getUserProfile = async (token: string) => {
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  try {
    const response = await fetch(`${API_URL}/profile/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.detail || "Failed to fetch user profile.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};


// Update user profile
export const updateUserProfile = async (token: string, profileData: any) => {
  try {
    const response = await fetch(`${API_URL}/profile/`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};


export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("Refresh token is missing. User must reauthenticate.");
  }

  try {
    const response = await fetch(`${API_URL}/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token.");
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access);
    return data.access;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
