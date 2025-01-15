import React, { useState } from "react";

const UpdateProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState({
    username: "JohnDoe1234",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Profile Data:", profileData);
  };

  return (
    <div className="bg-blue-100 flex flex-col items-center justify-center min-h-screen max-w-screen-lg mx-auto mt-8 rounded-lg">
      <div className="container bg-white rounded-lg p-8 w-11/12 max-w-lg text-center shadow-2xl">
        <h1 className="font-bold text-3xl text-blue-600 mb-6">بروزرسانی اطلاعات پروفایل</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
           {/* Name */}
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
          {/* Name */}
          <div>
            <label className="block text-blue-600 mb-2" htmlFor="name">
              نام
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 bg-blue-100"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-blue-600 mb-2" htmlFor="email">
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              className="w-full p-4 rounded-lg border border-gray-300 bg-blue-100"
              required
            />
          </div>

          {/* Phone */}
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


          {/* Password */}
          <div>
            <label className="block text-blue-600 mb-2" htmlFor="password">
              رمز عبور جدید
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={profileData.password}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 bg-blue-100"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-blue-600 mb-2" htmlFor="confirmPassword">
              تایید رمز عبور
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={profileData.confirmPassword}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 bg-blue-100"
            />
          </div>

          {/* Submit Button */}
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
