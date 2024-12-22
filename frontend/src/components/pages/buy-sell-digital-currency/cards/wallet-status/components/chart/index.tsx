import { useCoins } from "@hooks/use-coins";
import PieChart from "./pie-chart";
import LoadingPieChart from "./loading";

export default function MyWalletStatusChart() {
  const { data: coins, isLoading } = useCoins("/coins?&limit=3");

  return isLoading ? (
    <LoadingPieChart />
  ) : (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-2 md:pt-3 pt-4 md:border-t-0 border-t border-dashed border-t-gray-200">
      <PieChart data={coins?.result[0]} />
      <PieChart data={coins?.result[1]} />
      <PieChart data={coins?.result[2]} />
    </div>
  );
}
