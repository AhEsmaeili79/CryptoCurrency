import { useState, useEffect } from "react";
import { fetchUsdBalance } from "@api/walletApi";
import { useWallet } from "@store/wallet";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";

export default function MyWalletStatusContent() {
  const setTime = useWallet((state) => state.setTime);
  const [usdBalance, setUsdBalance] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token"); // Adjust if you store it differently
    if (accessToken) {
      fetchUsdBalance(accessToken)
        .then((balance) => setUsdBalance(balance))
        .catch((err) => console.error(err.message));
    }
  }, []);

  return (
    <div className="flex flex-col md:gap-3 gap-8">
      <div className="grid md:grid-cols-3 grid-cols-2 md:gap-2 gap-4 justify-start items-start">
        <div>
          <span className="text-blue-500 font-black text-lg md:text-center block">
            وضعیت حساب:
          </span>
        </div>
        <div>
          <span className="block text-center md:text-xs text-sm whitespace-nowrap text-blue-700 font-bold">
            موجودی کل حساب به دلار:
          </span>
          <span className="block text-center md:text-sm text-blue-700 font-extraBold">
            {usdBalance !== null ? `${usdBalance} دلار` : "0 دلار"}
          </span>
        </div>
        <div className="flex md:justify-end justify-center md:col-span-1 col-span-2">
          <div className="w-fit bg-blue-50 text-blue-primary px-2 py-1 rounded-full">
            <select
              className="md:text-xs bg-transparent font-semiBold outline-none"
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="priceChange1d">1 روز اخیر</option>
              <option value="priceChange1h">1 ساعت اخیر</option>
              <option value="priceChange1w">1 هفته اخیر</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex items-center justify-center">
          <div>
            <span className="block text-center text-green-primary text-sm font-semiBold whitespace-nowrap">
              میزان سود و زیان کل
            </span>
            <span className="block text-center text-green-primary text-sm font-bold">
              ۲۰.۰۰۰ تومان
            </span>
          </div>
          <IoMdArrowRoundUp color="#18CE2A" />
        </div>
        <div className="flex items-center justify-center">
          <div>
            <span className="block text-center text-red-500 text-sm font-semiBold">
              میزان ضرر
            </span>
            <span className="block text-center text-red-300 text-sm font-bold">
              ۵۳.۴۸۰ تومان
            </span>
          </div>
          <IoMdArrowRoundDown color="#F87C6B" />
        </div>
        <div className="flex items-center justify-center">
          <div>
            <span className="block text-center text-green-primary text-sm font-semiBold">
              میزان سود
            </span>
            <span className="block text-center text-green-primary text-sm font-bold">
              ۷۸.۴۸۰ تومان
            </span>
          </div>
          <IoMdArrowRoundUp color="#18CE2A" />
        </div>
      </div>
    </div>
  );
}
