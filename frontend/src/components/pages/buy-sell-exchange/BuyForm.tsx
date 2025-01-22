import React from "react";

interface BuyFormProps {
  cryptoName: string;
  amount: number | undefined;
  setAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  isLoading: boolean;
  handleBuy: () => Promise<void>;
}

const BuyForm: React.FC<BuyFormProps> = ({ cryptoName, amount, setAmount, isLoading, handleBuy }) => {
  return (
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
        className={`w-full py-3 rounded-lg text-white ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        onClick={handleBuy}
        disabled={isLoading}
      >
        {isLoading ? 'در حال خرید...' : 'خرید'}
      </button>
    </div>
  );
};

export default BuyForm;
