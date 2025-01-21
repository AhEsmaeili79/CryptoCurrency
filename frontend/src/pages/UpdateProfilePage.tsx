import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../api/authApi";
import toast from "react-hot-toast";


const UpdateProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [token] = useState(localStorage.getItem("access_token") || ""); // Replace with your auth token logic

  useEffect(() => {
    // Fetch user profile on mount
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setProfileData({
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name, 
          email: data.email,
          phone: data.phone_number || "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        toast.error("متاسفانه خطایی رخ داده است.");
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedData = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        email: profileData.email,
        phone_number: profileData.phone,
      };

      await updateUserProfile(token, updatedData);
      toast.success("با موفقیت انجام شد.");
    } catch (error) {
      toast.error("متاسفانه خطایی رخ داده است.");
    }
  };

  return (
    <div className="bg-blue-100 flex flex-col items-center justify-center min-h-screen max-w-screen-lg mx-auto mt-8 rounded-lg">
      <div className="container bg-white rounded-lg p-8 w-11/12 max-w-lg text-center shadow-2xl">
        <h1 className="font-bold text-3xl text-blue-600 mb-6">بروزرسانی اطلاعات پروفایل</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-blue-600 mb-2" htmlFor="username">
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={profileData.username}
              className="w-full p-4 rounded-lg border border-gray-300 bg-blue-50"
              disabled
            />
          </div>

          <div>
            <label className="block text-blue-600 mb-2" htmlFor="name">
              نام
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={profileData.first_name}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 bg-blue-100"
              required
            />
          </div>

          <div>
            <label className="block text-blue-600 mb-2" htmlFor="name">
              نام خانوادگی
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={profileData.last_name}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 bg-blue-100"
              required
            />
          </div>

          <div>
            <label className="block text-blue-600 mb-2" htmlFor="email">
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 bg-blue-100"
              required
            />
          </div>

          <div>
            <label className="block text-blue-600 mb-2" htmlFor="phone">
              شماره تلفن
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 bg-blue-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold"
          >
            بروزرسانی اطلاعات
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
