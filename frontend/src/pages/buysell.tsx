import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ChartComponent from "@utils/ChartComponent";

const BuyAndSellPage: React.FC = () => {
  const [activeForm, setActiveForm] = useState("buyForm");
  const [wallet, setWallet] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [targetCrypto, setTargetCrypto] = useState<string>("");

  const location = useLocation();
  const { cryptoName, icon, price, coins } = location.state || {};

  const token = localStorage.getItem("access_token");

  const API_HEADERS = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch Wallet Data
  const fetchWallet = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/wallet/", API_HEADERS);
      setWallet(response.data.reduce((acc: any, item: any) => {
        acc[item.cryptocurrency.symbol] = item.balance;
        return acc;
      }, {}));
      setLoading(false);
    } catch (err) {
      setError("Failed to load wallet data.");
      setLoading(false);
    }
  };

  // Buy Cryptocurrency
  const handleBuy = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/buy/",
        { cryptocurrency: cryptoName, amount },
        API_HEADERS
      );
      alert("خرید با موفقیت انجام شد.");
      fetchWallet(); 
    } catch (err) {
      setError("عملیات خرید با شکست مواجه شد.");
      console.error("Error details:", err);
    }
  };

  const handleSell = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/sell/",
        { cryptocurrency: cryptoName, amount },
        API_HEADERS
      );
      alert("فروش با موفقیت انجام شد!");
      fetchWallet(); 
    } catch (err) {
      setError("عملیات فروش با شکست مواجه شد.");
      console.error("Error details:", err);
    }
  };

  // Exchange Cryptocurrency
  const handleExchange = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/exchange/",
        {
          from_currency_id: cryptoName,
          to_currency_id: targetCrypto,
          amount,
        },
        API_HEADERS
      );
      alert("تبدیل با موفقیت انجام شد");
      fetchWallet(); 
    } catch (err) {
      setError("عملیات تبدیل با شکست مواجه شد.");
      console.error("Error details:", err);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen max-w-screen-lg mx-auto mt-8 rounded-lg shadow-xl">
      <div className="container bg-white rounded-lg p-8 w-11/12 max-w-3xl text-center shadow-2xl">
        <div className="flex justify-center items-center md:py-4 py-2 mb-6">
          <img
            src={icon}
            alt="icon"
            className="md:w-16 w-12 md:h-16 h-12 rounded-full border-4 border-blue-600"
          />
        </div>
        <h3 className="text-3xl text-blue-700 font-semibold mb-6">{cryptoName}</h3>

        <div className="mb-8">
          <ChartComponent price={price} cryptoname={cryptoName} />
        </div>

        {/* Navigation Tabs */}
        <div className="nav flex justify-around bg-blue-200 rounded-lg p-3 mb-6">
          <button
            className={`py-3 px-6 rounded-lg text-lg font-medium transition-transform ${
              activeForm === "buyForm"
                ? "bg-blue-600 text-white"
                : "text-blue-600 hover:bg-blue-300"
            }`}
            onClick={() => setActiveForm("buyForm")}
          >
            خرید
          </button>
          <button
            className={`py-3 px-6 rounded-lg text-lg font-medium transition-transform ${
              activeForm === "sellForm"
                ? "bg-blue-600 text-white"
                : "text-blue-600 hover:bg-blue-300"
            }`}
            onClick={() => setActiveForm("sellForm")}
          >
            فروش
          </button>
          <button
            className={`py-3 px-6 rounded-lg text-lg font-medium transition-transform ${
              activeForm === "convertForm"
                ? "bg-blue-600 text-white"
                : "text-blue-600 hover:bg-blue-300"
            }`}
            onClick={() => setActiveForm("convertForm")}
          >
            تبدیل
          </button>
        </div>

        {/* Wallet Balance */}
        <div className="wallet-info mb-6">
          <h2 className="text-xl text-blue-600 font-semibold mb-4">موجودی کیف پول</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 text-blue-700 font-medium">
              {Object.entries(wallet).map(([currency, balance]: any) => (
                <div key={currency}>
                  {currency.toUpperCase()}: {balance}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Forms */}
        <div className="forms">
          {activeForm === "buyForm" && (
            <div className="form p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-50">
              <h2 className="font-bold text-xl text-blue-600 mb-4">خرید {cryptoName}</h2>
              <input
                type="number"
                placeholder="مبلغ خود را وارد کنید"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-4 mb-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleBuy}
              >
                خرید
              </button>
            </div>
          )}

          {activeForm === "sellForm" && (
            <div className="form p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-50">
              <h2 className="font-bold text-xl text-blue-600 mb-4">فروش {cryptoName}</h2>
              <input
                type="number"
                placeholder="مبلغ خود را وارد کنید"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-4 mb-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleSell}
              >
                فروش
              </button>
            </div>
          )}

          {activeForm === "convertForm" && (
            <div className="form p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-50">
              <h2 className="font-bold text-xl text-blue-600 mb-4">تبدیل {cryptoName}</h2>
              <input
                type="number"
                placeholder="مبلغ خود را وارد کنید"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-4 mb-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <select
                value={targetCrypto}
                onChange={(e) => setTargetCrypto(e.target.value)}
                className="w-full p-4 mb-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {coins && coins.length > 0 ? (
                  coins.map((coin: any, index: number) => (
                    <option key={index} value={coin.id}>
                      {coin.id}
                    </option>
                  ))
                ) : (
                  <option disabled>Coins data is not available</option>
                )}
              </select>
              <button
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleExchange}
              >
                تبدیل
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyAndSellPage;
