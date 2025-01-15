import React, { useState } from "react";

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
    <div className="bg-blue-100 flex flex-col items-center justify-center min-h-screen max-w-screen-lg mx-auto mt-8 rounded-lg">
      <div className="container bg-white rounded-lg p-8 w-11/12 max-w-lg text-center shadow-2xl">
        <h1 className="font-bold text-3xl text-blue-600 mb-6">خرید و فروش و تبدیل ارزها</h1>

        {/* Navigation Tabs */}
        <div className="nav flex justify-around bg-blue-200 rounded-lg p-3 mb-6">
          <button
            className={`py-3 px-6 rounded-lg text-lg transition-transform ${
              activeForm === "buyForm" ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-300"
            }`}
            onClick={() => setActiveForm("buyForm")}
          >
            خرید
          </button>
          <button
            className={`py-3 px-6 rounded-lg text-lg transition-transform ${
              activeForm === "sellForm" ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-300"
            }`}
            onClick={() => setActiveForm("sellForm")}
          >
            فروش
          </button>
          <button
            className={`py-3 px-6 rounded-lg text-lg transition-transform ${
              activeForm === "convertForm" ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-300"
            }`}
            onClick={() => setActiveForm("convertForm")}
          >
            تبدیل
          </button>
        </div>

        {/* Wallet Balance */}
        <div className="wallet-info mb-6">
          <h2 className="text-xl text-blue-600 mb-4">موجودی کیف پول</h2>
          <div className="grid grid-cols-2 gap-4 text-blue-700">
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
            <div className="form p-6 border border-gray-300 rounded-lg shadow-lg">
              <h2 className="font-bold text-xl text-blue-600 mb-4">خرید ارز</h2>
              <input
                type="number"
                placeholder="مبلغ خود را وارد کنید"
                className="w-full p-4 mb-4 rounded-lg border border-gray-300"
              />
              <select className="w-full p-4 mb-4 rounded-lg border border-gray-300">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </select>
              <select className="w-full p-4 mb-4 rounded-lg border border-gray-300">
                <option value="btc">Bitcoin (BTC)</option>
                <option value="eth">Ethereum (ETH)</option>
              </select>
              <button
                className="w-full py-3 bg-blue-600 text-white rounded-lg"
                onClick={() => handleTransaction("buy", "btc", 0.1)} // Example
              >
                خرید
              </button>
            </div>
          )}

          {activeForm === "sellForm" && (
            <div className="form p-6 border border-gray-300 rounded-lg shadow-lg">
              <h2 className="font-bold text-xl text-blue-600 mb-4">فروش ارز</h2>
              <input
                type="number"
                placeholder="مبلغ خود را وارد کنید"
                className="w-full p-4 mb-4 rounded-lg border border-gray-300"
              />
              <select className="w-full p-4 mb-4 rounded-lg border border-gray-300">
                <option value="btc">Bitcoin (BTC)</option>
                <option value="eth">Ethereum (ETH)</option>
              </select>
              <select className="w-full p-4 mb-4 rounded-lg border border-gray-300">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </select>
              <button
                className="w-full py-3 bg-blue-600 text-white rounded-lg"
                onClick={() => handleTransaction("sell", "btc", 0.1)} // Example
              >
                فروش
              </button>
            </div>
          )}

          {activeForm === "convertForm" && (
            <div className="form p-6 border border-gray-300 rounded-lg shadow-lg">
              <h2 className="font-bold text-xl text-blue-600 mb-4">تبدیل ارز</h2>
              <input
                type="number"
                placeholder="مبلغ خود را وارد کنید"
                className="w-full p-4 mb-4 rounded-lg border border-gray-300"
              />
              <select className="w-full p-4 mb-4 rounded-lg border border-gray-300">
                <option value="btc">Bitcoin (BTC)</option>
                <option value="eth">Ethereum (ETH)</option>
              </select>
              <select className="w-full p-4 mb-4 rounded-lg border border-gray-300">
                <option value="doge">Dogecoin (DOGE)</option>
                <option value="ltc">Litecoin (LTC)</option>
              </select>
              <button
                className="w-full py-3 bg-blue-600 text-white rounded-lg"
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
