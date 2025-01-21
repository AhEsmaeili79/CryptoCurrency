import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ChartComponent from "@utils/ChartComponent";

const BuyAndSellPage: React.FC = () => {
  const [activeForm, setActiveForm] = useState("buyForm");
  const [wallet, setWallet] = useState({
    usd: 1000,
    eur: 500,
    btc: 0.5,
    eth: 2,
    doge: 1000,
    ltc: 200,
  });

  const location = useLocation();
  const { cryptoName, icon, price, coins } = location.state || {};

  const handleTransaction = (type: string, currency: string, amount: number) => {
    setWallet((prevWallet) => {
      const updatedWallet = { ...prevWallet };
      if (type === "buy") {
        updatedWallet[currency] += amount;
      } else if (type === "sell") {
        updatedWallet[currency] -= amount;
      }
      return updatedWallet;
    });
  };

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
          <div className="grid grid-cols-2 gap-4 text-blue-700 font-medium">
            <div>USD: {wallet.usd}</div>
            <div>EUR: {wallet.eur}</div>
            <div>Bitcoin (BTC): {wallet.btc}</div>
            <div>Ethereum (ETH): {wallet.eth}</div>
            <div>Dogecoin (DOGE): {wallet.doge}</div>
            <div>Litecoin (LTC): {wallet.ltc}</div>
          </div>
        </div>

        {/* Forms */}
        <div className="forms">
          {activeForm === "buyForm" && (
            <div className="form p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-50">
              <h2 className="font-bold text-xl text-blue-600 mb-4">خرید {cryptoName}</h2>
              <input
                type="number"
                placeholder="مبلغ خود را وارد کنید"
                className="w-full p-4 mb-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <select className="w-full p-4 mb-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="Iranian Rial">ریال</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </select>
              <button
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => handleTransaction("buy", "btc", 0.1)} // Example
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
                className="w-full p-4 mb-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <select className="w-full p-4 mb-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="Iranian Rial">ریال</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </select>
              <button
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => handleTransaction("sell", "btc", 0.1)} // Example
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
                className="w-full p-4 mb-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <select className="w-full p-4 mb-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
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
                onClick={() => handleTransaction("buy", "doge", 200)} // Example
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
