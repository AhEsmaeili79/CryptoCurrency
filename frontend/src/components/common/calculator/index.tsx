import React, { useState, useEffect } from "react";
import { RiSettings5Fill } from "react-icons/ri";
import { TbSwitchVertical } from "react-icons/tb";
import { useCoins } from "@hooks/use-coins";

export default function Calculator({ customClassName }: { customClassName?: string }) {
  const { data: fetchedCoins } = useCoins(`/coins`);
  const [sourceAmount, setSourceAmount] = useState<number>(0);
  const [sourceCurrency, setSourceCurrency] = useState<string>("");
  const [targetCurrency, setTargetCurrency] = useState<string>("");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (fetchedCoins && fetchedCoins.result) {
      setSourceCurrency(fetchedCoins.result[0]?.symbol || "");
      setTargetCurrency(fetchedCoins.result[1]?.symbol || "");
    }
  }, [fetchedCoins]);

  useEffect(() => {
    handleCalculate(); // Automatically calculate when dependencies change
  }, [sourceAmount, sourceCurrency, targetCurrency]);

  const handleCalculate = () => {
    if (!fetchedCoins || !sourceCurrency || !targetCurrency) return;

    const sourceCoin = fetchedCoins.result.find((coin: any) => coin.symbol === sourceCurrency);
    const targetCoin = fetchedCoins.result.find((coin: any) => coin.symbol === targetCurrency);

    if (sourceCoin && targetCoin) {
      const conversionRate = sourceCoin.price / targetCoin.price;
      const targetAmount = sourceAmount * conversionRate;
      setResult(`${targetAmount.toFixed(6)} ${targetCurrency}`);
    } else {
      setResult("Invalid selection");
    }
  };

  const handleSwitch = () => {
    const temp = sourceCurrency;
    setSourceCurrency(targetCurrency);
    setTargetCurrency(temp);
    handleCalculate(); // Recalculate after switching
  };

  return (
    <div
      className={`${
        customClassName
          ? customClassName
          : "border-2 backdrop-blur-xl border-blue-300 rounded-3xl px-4 py-6 lg:w-7/12 md:w-9/12 w-full mx-auto flex flex-col relative z-1"
      }`}
      style={{
        background: customClassName
          ? ""
          : "linear-gradient(318deg, #DFE6FF -0.59%, #E7ECFF 21.43%, rgba(235, 239, 255, 0.00) 110.69%)",
      }}
    >
      <div className="flex justify-between text-blue-primary items-center gap-16">
        <h4 className="font-bold text-xl ml-auto">تبدیل قیمت ارز</h4>
        <RiSettings5Fill size={30} />
      </div>

      <div className="mt-4">
        <label className="text-blue-primary font-semiBold mb-2 text-sm block">مقدار</label>
        <div className="bg-white border border-gray-200 py-1 px-4 rounded-lg flex gap-4">
          <input
            className="bg-transparent w-2/3 py-2 text-left outline-none placeholder:text-xs placeholder:text-gray-300 placeholder:text-right text-gray-400 text-sm ltr"
            placeholder="مقدار را وارد کنید"
            type="number"
            value={sourceAmount}
            onChange={(e) => setSourceAmount(parseFloat(e.target.value) || 0)}
          />
          <select
            className="w-1/2 bg-transparent outline-none"
            value={sourceCurrency}
            onChange={(e) => setSourceCurrency(e.target.value)}
          >
            {fetchedCoins?.result?.map((coin: any) => (
              <option key={coin.id} value={coin.symbol}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="my-2 mx-auto w-fit" onClick={handleSwitch}>
        <TbSwitchVertical className="text-green-primary" size={30} />
      </button>

      <div>
        <label className="text-blue-primary font-semiBold mb-2 text-sm block">تبدیل به</label>
        <div className="bg-white border border-gray-200 py-1 px-4 rounded-lg flex gap-4">
          <select
            className="w-full py-1 bg-transparent outline-none"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            {fetchedCoins?.result?.map((coin: any) => (
              <option key={coin.id} value={coin.symbol}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 justify-center text-sm mt-2 text-blue-primary">
        <span>{result || "نتیجه نمایش داده می‌شود"}</span>
      </div>
    </div>
  );
}
