import { useState, useEffect } from "react";
import { getUserProfile } from "../../../../../api/authApi";
import userProfileImg from "../../../../../assets/images/items/userprofile.png";
import { Link } from "react-router-dom";
export default function MyInfoCard() {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
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
        });
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const my_data = [
    {
      title: "نام",
      value: `${profileData.first_name} ${profileData.last_name}`,
    },
    {
      title: "تعداد خرید",
      value: "200",
    },
    {
      title: "تعداد فروش",
      value: "504",
    },
  ];

  return (
    <div className="bg-[#CCE0EB] p-6 rounded-2xl grid grid-cols-3 gap-2 items-center h-fit">
      <Link to="/profile">
          <div className="w-16 h-17  rounded-full"><img src={userProfileImg} alt="User Profile" /></div>
      </Link>
      <div className="col-span-2 flex flex-col gap-2">
        {my_data.map(({ title, value }) => (
          <div className="flex justify-between items-center text-gray-800" key={title}>
            <span className="text-sm font-bold">{title}</span>
            <span className="text-sm">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
