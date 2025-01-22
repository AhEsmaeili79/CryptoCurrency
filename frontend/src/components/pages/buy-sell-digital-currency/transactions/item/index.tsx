import { TiArrowDownThick, TiArrowUpThick, TiArrowLeftThick } from "react-icons/ti";
import moment from "moment-jalaali";
import { TransactionItemType } from "./type";

// Define a mapping of transaction types to their Persian labels and colors
const transactionDetails: Record<
  string,
  { label: string; color: string; icon: JSX.Element }
> = {
  buy: { label: "خرید", color: "text-green-500", icon: <TiArrowUpThick color="#18CE2A" size={20} /> },
  sell: { label: "فروش", color: "text-red-500", icon: <TiArrowDownThick color="#F75B46" size={20} /> },
  exchange: { label: "مبادله", color: "text-yellow-500", icon: <TiArrowLeftThick color="#FFCC00" size={20} /> },
};

export default function TransactionItem({ item }: TransactionItemType) {
  const transactionDetail = transactionDetails[item.transaction_type] || {};

  return (
    <div className="flex items-center justify-between p mt-2 border-b border-dashed pb-2 pl-2">
      <div className="flex items-center gap-2">
        {/* icon */}
        <div
          className={`w-8 h-8 flex justify-center items-center rounded-full`} // Circle shape
          style={{ backgroundColor: "#F3F4F6" }} // Light background
        >
          {transactionDetail.icon}
        </div>

        <div>
          <span className="block text-sm text-blue-primary font-semiBold">
            {item.cryptocurrency_name}
          </span>
          <span
            className={`block text-xs font-medium ${
              transactionDetail.color || "text-gray-400"
            }`}
          >
            {transactionDetail.label}
          </span>
        </div>
      </div>
      <div>
        <span className="text-blue-primary font-semiBold block">
          {item.amount}
          <span className="text-xs"></span>
        </span>
        <span className="text-blue-400 block text-xs text-left">
          {moment(item.created_at).format("jYYYY/jMM/jDD")}
        </span>
      </div>
    </div>
  );
}
