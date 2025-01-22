import { useCoins } from "@hooks/use-coins";
import LinearChart from "./linear-chart";
import { useState, useEffect } from "react";

export default function WholeChart() {
  const { data: fetchedCoins, isLoading } = useCoins(`/coins`);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);


  useEffect(() => {
    if (fetchedCoins && fetchedCoins.result) {
      const bitcoin = fetchedCoins.result.find(coin => coin.symbol.toLowerCase() === 'btc');
      if (bitcoin) {
        setSelectedCoin(bitcoin);
      }
    }
  }, [fetchedCoins]);

  if (isLoading) {
    return (
      <div className="bg-white animate-pulse card-shadow p-4 rounded-xl mt-4">
        <div className="rounded-full bg-slate-200 h-14 w-14"></div>
      </div>
    );
  }

  const filteredCoins = fetchedCoins.result.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCoinSelection = (coin) => {
    setSelectedCoin(coin);
  };

  return (
    <div className="bg-white card-shadow p-4 rounded-xl mt-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="جست و جوی رمز ارز جهت نمایش نمودار قیمت"
          className="p-2 w-full border rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      
      <div
        className="max-h-[100px] overflow-y-auto space-y-2 mb-5"
        style={{ maxHeight: "100px" }} 
      >
        {filteredCoins.slice(0).map((coin) => (  
          <div
            key={coin.id}
            className="cursor-pointer p-2 bg-slate-100 rounded-lg flex items-center gap-2"
            onClick={() => handleCoinSelection(coin)}
          >
            <img src={coin.icon} alt={coin.symbol} className="w-8 h-8" />
            <span className="font-semibold">{coin.name} ({coin.symbol})</span>
          </div>
        ))}
      </div>

      
      {selectedCoin && (
      <LinearChart coin={selectedCoin} />
      )}
    </div>
  );
}
