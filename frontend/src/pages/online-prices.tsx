import { OnlinePricesTable } from "@common/table/online-prices";
import CryptoMarketCards from "@common/cards/card-crypto-market";
import { useState } from "react";
import SafeExchange from "@pagesComp/home/content/safe-exchange";

export default function OnlinePricesPage() {
  const [limit, setLimit] = useState<number>(10);
  const clickHandler = () => {
    setLimit((prv) => prv + 10);
  };
  return (
    <div className="inner-container mx-auto md:px-0 px-2">
      <CryptoMarketCards />
      <h2 className="text-center lg:mt-24 mt-12 mb-8">
        <span className="block font-black text-5xl text-red-primary">
          آنلاین
        </span>
        <span className="font-bold text-2xl ml-24 -mt-3 block">قیمت‌های</span>
      </h2>
      <section className="inner-container mx-auto mb-12 flex flex-col">
        <div className="shadow-lg bg-white rounded-3xl">
          <OnlinePricesTable limit={limit} />
        </div>
        <button
          onClick={clickHandler}
          className="mx-auto mt-12 border-2 border-blue-primary text-blue-primary text-sm px-4 py-2 rounded-lg font-bold"
        >
          مشاهده رمز ارز‌های بیشتر
        </button>
      </section>
      <SafeExchange />
    </div>
  );
}
