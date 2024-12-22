import { transactions } from "@assets/data";
import TransactionItem from "./item";

export default function Transactions() {
  return (
    <div className="bg-white card-shadow rounded-2xl p-3">
      <h4 className="font-bold text-blue-primary text-lg bg-white block pb-2">
        معامله‌ها
      </h4>
      <div className="xl:max-h-[7.5rem] lg:max-h-[13.5rem] h-full overflow-auto">
        {transactions.map((item) => (
          <TransactionItem item={item} />
        ))}
      </div>
    </div>
  );
}
