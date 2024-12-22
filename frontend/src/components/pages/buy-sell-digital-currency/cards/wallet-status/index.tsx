import MyWalletStatusChart from "./components/chart";
import MyWalletStatusContent from "./components/content";

export default function WalletStatus() {
  return (
    <div className="bg-white p-4 rounded-2xl grid xl:grid-cols-2 gap-4 card-shadow">
      <MyWalletStatusContent />
      <MyWalletStatusChart />
    </div>
  );
}
