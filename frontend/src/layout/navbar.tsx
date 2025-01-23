import { img } from "@data";
import { useEffect, useState } from "react";
import { BsHeadphones, BsPersonFill ,BsFillBagDashFill } from "react-icons/bs";
import { FaHeadphones, FaSignOutAlt } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { HiHome, HiMenu } from "react-icons/hi";
import { MdInsertChart } from "react-icons/md";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { logoutUser, refreshToken, getUserProfile } from "../api/authApi"; 

export default function Navbar() {
  // Show menu state
  const [showMenu, setShowMenu] = useState<Boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const showMenuHandler = () => {
    setShowMenu(true);
  };

  // Logout handler
  const handleLogout = async () => {
    const token = localStorage.getItem("access_token"); 
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      await logoutUser(token);
      localStorage.removeItem("access_token");
      window.location.href = "/"; 
    } catch (error: any) {
      console.error("Error during logout:", error.message);
    }
  };

  const closeMenuHandler = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No token found.");
        setLoading(false);
        return;
      }

      try {
        const profileData = await getUserProfile(token);
        setProfile(profileData);
        setIsLoggedIn(true);
        setLoading(false);
      } catch (error) {
        if (error.message.includes("token")) {
          const newToken = await refreshToken();
          localStorage.setItem("access_token", newToken);
          const refreshedProfileData = await getUserProfile(newToken);
          setProfile(refreshedProfileData);
          setIsLoggedIn(true);
        } else {
          console.error("Error fetching profile:", error.message);
          setIsLoggedIn(false);
        }
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // menus list
  const menus = [
    {
      title: "صفحه اصلی",
      to: "/",
      icon: <HiHome size={20} />,
    },
    {
      title: "قیمت‌های آنلاین",
      to: "/online-prices",
      icon: <MdInsertChart size={20} />,
    },
    {
      title: "مقالات آموزشی",
      to: "/learning-articles",
      icon: <PiPencilSimpleLineFill size={20} />,
    },
    {
      title: "اخبار",
      to: "/news",
      icon: <FaNewspaper size={20} />,
    },
    {
      title: "ارتباط با ما",
      to: "/contact-us",
      icon: <FaHeadphones size={20} />,
    },
  ];

  return (
    <div
      className="inner-container mx-auto py-4 lg:px-8 px-4 mt-4 rounded-2xl flex gap-8 items-center bg-white z-10 sticky top-4"
      style={{
        boxShadow: "0px 12px 25px -9px rgba(83, 83, 83, 0.15)",
      }}
    >
      <button className="lg:hidden block" onClick={showMenuHandler}>
        <HiMenu className="text-blue-800" size={22} />
      </button>
      <Link to="/" className="logo flex lg:mr-0 mr-auto lg:ml-0 -ml-10">
        <img src={img.logo_main} alt="logo" className="lg:w-auto w-20" />
      </Link>

      <div
        className={`${
          showMenu == true
            ? "flex absolute bg-white -right-[2.6vw] left-0 p-4 h-[100vh] -top-[2.6vh] w-[100vw] items-center justify-center"
            : "hidden lg:block"
        } `}
      >
        <div className="flex lg:flex-row flex-col gap-4 overflow-hidden lg:w-auto w-54">
          <button onClick={closeMenuHandler} className="lg:hidden block mb-8">
            <FaSignOutAlt className="text-blue-primary" size={32} />
          </button>
          {menus.map(({ title, to, icon }) => (
            <NavLink
              key={title}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-primary border-b-2 border-b-blue-primary font-bold pb-1 flex gap-2 items-center lg:max-w-auto max-w-32 w-fit text-right whitespace-nowrap"
                  : "text-gray-300 text-14 pb-1 flex gap-2 items-center lg:max-w-auto max-w-32 w-fit text-right whitespace-nowrap"
              }
              to={to}
              onClick={closeMenuHandler}
            >
              <span className="lg:hidden block">{icon}</span>
              {title}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mr-auto">
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="text-14 text-white bg-blue-primary py-2 lg:px-4 px-2 rounded-lg flex items-center gap-2"
            >
              <span className="lg:block hidden">داشبورد</span>
              <BsFillBagDashFill size={20} />
            </Link>
            <Link
              to="/profile"
              className="text-14 text-white bg-green-500 py-2 lg:px-4 px-2 rounded-lg flex items-center gap-2"
            >
              <span className="lg:block hidden">پروفایل</span>
              <BsPersonFill size={20} />
            </Link>
            <button
              onClick={handleLogout}
              className="text-14 text-white bg-red-primary py-2 lg:px-4 px-2 rounded-lg flex items-center gap-2"
            >
              <span className="lg:block hidden">خروج</span>
              <FaSignOutAlt size={20} />
            </button>
          </>
        ) : (
          <Link
            to="auth"
            className="text-14 text-white bg-blue-primary py-2 lg:px-4 px-2 rounded-lg flex items-center gap-2"
          >
            <span className="lg:block hidden">ورود / ثبت نام</span>
            <BsPersonFill size={20} />
          </Link>
        )}
      </div>
    </div>
  );
}
