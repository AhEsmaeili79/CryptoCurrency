import { useCoins } from "@hooks/use-coins";
import LinearChart from "./linear-chart";

export default function WholeChart() {
  const { data: bitcoin, isLoading } = useCoins(`/coins/bitcoin`);

  if (isLoading) {
    return (
      <div className="bg-white animate-pulse card-shadow p-4 rounded-xl mt-4">
        <div className="rounded-full bg-slate-200 h-14 w-14"></div>
      </div>
    );
  }
  return (
    <div className="bg-white card-shadow p-4 rounded-xl mt-4">
      <div>
        <div className="flex items-center gap-2">
          <img src={bitcoin.icon} alt={bitcoin.symbol} className="w-12 h-12" />
          <span className="font-black text-2xl ">{bitcoin.symbol}</span>
        </div>
      </div>
      <LinearChart />
    </div>
  );
}
