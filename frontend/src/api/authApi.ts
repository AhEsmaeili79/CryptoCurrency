const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const signupUser = async (username: string, email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/users/register/`, {
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
    return data; 
  } catch (error) {
    throw new Error(error.message || "Signup failed");
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username, 
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};


export const logoutUser = () => {
  localStorage.removeItem("access_token");
};


export const getUserProfile = async (token: string) => {
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  try {
    const response = await fetch(`${API_URL}/users/profile/`, {
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


export const updateUserProfile = async (token: string, profileData: any) => {
  try {
    const response = await fetch(`${API_URL}/users/profile/`, {
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
