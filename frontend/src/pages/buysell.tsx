import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useCoins } from "@hooks/use-coins";
import ChartComponent from "@utils/ChartComponent";
import WalletInfo from "@pagesComp/buy-sell-exchange/WalletInfo";
import BuyForm from "@pagesComp/buy-sell-exchange/BuyForm";
import SellForm from "@pagesComp/buy-sell-exchange/SellForm";
import ConvertForm from "@pagesComp/buy-sell-exchange/ConvertForm";
import NavButtons from "@pagesComp/buy-sell-exchange/NavButtons";


import { buyCrypto, sellCrypto, exchangeCrypto } from '@api/transactionApi';
import { fetchWalletData } from '@api/walletApi';  

interface BuyAndSellPageProps {
  cryptoName?: string;
  icon?: string;
  price?: number;
  Symbol?: string;
}

const BuyAndSellPage: React.FC<BuyAndSellPageProps> = () => {
  const [activeForm, setActiveForm] = useState<"buyForm" | "sellForm" | "convertForm">("buyForm");
  const [wallet, setWallet] = useState<Wallet>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [targetCrypto, setTargetCrypto] = useState<string>("");
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const location = useLocation();
  const { cryptoName, icon, price, Symbol } = location.state || {};
  const { data: fetchedCoins } = useCoins(`/coins?&limit=250`);

  useEffect(() => {
    if (fetchedCoins?.result) {
      setCoins(fetchedCoins.result);
    }
  }, [fetchedCoins]);

  const fetchWallet = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        setError("لطفاً وارد شوید");
        setLoading(false);
        return;
      }

      setLoading(true);
      const walletData = await fetchWalletData(accessToken);
      setWallet(walletData);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleBuy = async () => {
    if (amount && amount <= 0) {
      toast.error("مقدار خرید باید بزرگتر از صفر باشد.");
      return;
    }

    try {
      setIsLoading(true);
      await buyCrypto(cryptoName, amount);
      toast.success("خرید با موفقیت انجام شد");
      setIsLoading(false);
      fetchWallet();
      setAmount(0);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "دوباره امتحان کنید!");
      console.error("Error details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSell = async () => {
    try {
      setIsLoading(true);
      await sellCrypto(cryptoName, amount);
      toast.success("فروش با موفقیت انجام شد");
      setIsLoading(false);
      fetchWallet();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "دوباره امتحان کنید!");
      console.error("Error details:", error);
      setIsLoading(false);
    }
  };

  const handleExchange = async () => {
    try {
      setIsLoading(true);
      await exchangeCrypto(cryptoName, targetCrypto, amount);
      toast.success("تبدیل با موفقیت انجام شد!");
      setIsLoading(false);
      fetchWallet();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "دوباره امتحان کنید!");
      console.error("Error details:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen max-w-screen-lg mx-auto mt-8 rounded-lg shadow-xl">
      <div className="container bg-white rounded-lg p-8 w-11/12 max-w-3xl text-center shadow-2xl mb-6">
        <div className="flex justify-center items-center md:py-4 py-2 mb-6">
          <img
            src={icon}
            alt="icon"
            className="md:w-16 w-12 md:h-16 h-12 rounded-full border-4 border-blue-600"
          />
        </div>
        <h3 className="text-3xl text-blue-700 font-semibold mb-6">
          ({Symbol}) {cryptoName}
        </h3>

        <div className="mb-8">
          <ChartComponent price={price} cryptoname={cryptoName} />
        </div>

        <NavButtons activeForm={activeForm} setActiveForm={setActiveForm} />

        <WalletInfo wallet={wallet} loading={loading} error={error} />

        <div className="forms">
          {activeForm === "buyForm" && <BuyForm cryptoName={cryptoName} amount={amount} setAmount={setAmount} isLoading={isLoading} handleBuy={handleBuy} />}
          {activeForm === "sellForm" && <SellForm cryptoName={cryptoName} amount={amount} setAmount={setAmount} isLoading={isLoading} handleSell={handleSell} />}
          {activeForm === "convertForm" && <ConvertForm cryptoName={cryptoName} coins={coins} amount={amount} isLoading={isLoading} setAmount={setAmount} targetCrypto={targetCrypto} setTargetCrypto={setTargetCrypto} handleExchange={handleExchange} />}
        </div>
      </div>
    </div>
  );
};

export default BuyAndSellPage;
