import { useCoins } from "@hooks/use-coins";
import { numberSeprator } from "@utils/numberSeprator";
import TableRow from "./cmponents/row";
import { useEffect, useState } from "react";

export const OnlinePricesTable = ({ limit = 4 }: { limit?: number }) => {
  const { data: fetchedCoins, error, isLoading } = useCoins(`/coins?&limit=${limit}`);

  const [coins, setCoins] = useState<any[]>([]);
  useEffect(() => {
    if (fetchedCoins?.result) {
      setCoins(fetchedCoins.result);
    }
  }, [fetchedCoins]);

  if (error) {
    return (
      <div className="md:col-span-5 col-span-3 ">
        <span className="text-red-primary text-center block py-4 font-bold">
          متاسفانه خطایی رخ داده است.
        </span>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-5 grid-cols-3 bg-white rounded-3xl md:h-auto md:max-h-max max-h-[30rem] overflow-auto card-shadow lg:px-8 md:px-4 px-2">
      <span className="text-center block text-gray-400 font-semiBold text-lg py-4 border-b border-b-blue-100">
        رمز ارزها
      </span>
      <span className="text-center block text-gray-400 font-semiBold text-lg py-4 border-b border-b-blue-100">
        قیمت لحظه‌ای
      </span>
      <span className="text-center md:block hidden text-gray-400 font-semiBold text-lg py-4 border-b border-b-blue-100">
        حجم در ۲۴ ساعت
      </span>
      <span className="text-center md:block hidden text-gray-400 font-semiBold text-lg py-4 border-b border-b-blue-100">
        تغییرات یک هفته اخیر
      </span>
      <span className="text-center block text-gray-400 font-semiBold text-lg py-4 border-b border-b-blue-100">
        معامله
      </span>
      {coins.map((coin: any, index: number) => (
        <TableRow
          cryptoname={coin.id}
          symbol={coin.symbol}
          key={coin.price}
          icon={coin.icon}
          price={numberSeprator(Math.round(coin.price).toFixed(0))}
          volume={numberSeprator(Math.round(coin.volume).toFixed(0))}
          priceChange1w={coin.priceChange1w}
          index={index}
          coins={coins}
        />
      ))}
      {isLoading && (
        <div className="md:col-span-5 col-span-3 grid md:grid-cols-5 grid-cols-3 border-b border-b-blue-400 gap-16 lg:px-8 md:px-4 px-2 py-4">
          <span className="md:w-16 w-10 md:h-16 h-10 rounded-full bg-gray-100 m-auto"></span>
          <span className="bg-gray-100 h-4 rounded-lg w-full m-auto"></span>
          <span className="bg-gray-100 h-4 rounded-lg w-full m-auto"></span>
          <span className="bg-gray-100 h-4 rounded-lg w-full m-auto"></span>
          <span className="bg-gray-100 h-4 rounded-lg w-full m-auto"></span>
        </div>
      )}
    </div>
  );
};
