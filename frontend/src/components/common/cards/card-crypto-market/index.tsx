import SectionsTitle from "@common/titles/section";
import { img } from "@data";
import { useCoins } from "@hooks/use-coins";
import { numberSeprator } from "@utils/numberSeprator";
import { useState } from "react";
import { CryptoCard } from "./card";
import { LoadingCard } from "./loading-card";

export default function CryptoMarketCards() {
  const [moneyType, setMonyType] = useState<boolean>(true);

  return (
    <div
      className="mt-12 pb-12 lg:px-8 md:px-4 px-2"
      style={{
        background: `url(${img.crypto_market_bg}) no-repeat center right`,
        backgroundSize: "contain",
      }}
    >
      <section className="mx-auto">
        {/* Title Section*/}
        <SectionsTitle number={1} title="کریپتر" subTitle="بازارهای">
          <div className="bg-blue-primary rounded-lg flex items-center gap-2 p-2 h-fit md:text-sm text-xs font-semiBold">
            <button
              className={`px-2 py-1 rounded-md ${
                moneyType ? "bg-white text-blue-700" : "text-white"
              }`}
              onClick={() => setMonyType(true)}
            >
              دلار $
            </button>
            <button
              className={`px-2 py-1 rounded-md ${
                !moneyType ? "bg-white text-blue-700" : "text-white"
              }`}
              onClick={() => setMonyType(false)}
            >
              تتر USDT
            </button>
          </div>
        </SectionsTitle>
        {/* End Title Section*/}

        {/* Cards */}
        <section className="grid md:grid-cols-4 grid-cols-2 xl:gap-12 lg:gap-8 gap-4">
          <Cards moneyType={moneyType} />
        </section>
        {/* End Card Section */}
      </section>
    </div>
  );
}

const Cards = ({ moneyType }: { moneyType: boolean }) => {
  const { data: coins, isLoading } = useCoins(
    `/coins?&limit=4&page=${moneyType ? "2" : "3"}`
  );

  if (isLoading) {
    return (
      <>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </>
    );
  }

  return coins?.result?.map((coin: any) => (
    <CryptoCard
      key={coin.name}
      icon={coin.icon}
      name={coin.name}
      price={numberSeprator(Math.round(coin.price))}
      priceChange1h={coin.priceChange1h}
      priceChange1d={coin.priceChange1d}
    />
  ));
};
