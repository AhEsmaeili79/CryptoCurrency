import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserProfile } from "@api/authApi";
import { fetchTransactions } from "@api/transactionApi";
import userProfileImg from "@assets/images/items/images-modified.png";


export default function MyInfoCard() {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
  });

  const [transactions, setTransactions] = useState([]);
  const [buyCount, setBuyCount] = useState(0);
  const [sellCount, setSellCount] = useState(0);

  const [token] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
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

    const fetchTransactionsData = async () => {
      try {
        const transactionData = await fetchTransactions(token); 
        setTransactions(transactionData);

        const buyTransactions = transactionData.filter(transaction => transaction.transaction_type === "buy");  
        const sellTransactions = transactionData.filter(transaction => transaction.transaction_type === "sell");
        
        setBuyCount(buyTransactions.length);
        setSellCount(sellTransactions.length);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    if (token) {
      fetchProfile();
      fetchTransactionsData();
    }
  }, [token]);

  const my_data = [
    {
      title: "نام",
      value: `${profileData.first_name} ${profileData.last_name}`,
    },
    {
      title: "تعداد خرید",
      value: buyCount.toString(),  
    },
    {
      title: "تعداد فروش",
      value: sellCount.toString(),  
    },
  ];

  return (
    <div className="bg-[#CCE0EB] p-6 rounded-2xl grid grid-cols-3 gap-2 items-center h-fit">
      <Link to="/profile">
        <div className="w-16 h-17 rounded-full">
          <img src={userProfileImg} alt="User Profile" />
        </div>
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
