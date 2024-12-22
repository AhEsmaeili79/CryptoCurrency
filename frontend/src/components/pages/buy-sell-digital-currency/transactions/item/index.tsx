import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";
import { TransactionItemType } from "./type";

export default function TransactionItem({ item }: TransactionItemType) {
  return (
    <div className="flex items-center justify-between p mt-2 border-b border-dashed pb-2 pl-2">
      <div className="flex items-center gap-2">
        {/* icon */}
        <div className="bg-blue-100 w-8 h-8 flex justify-center items-center rounded-lg">
          {item.method == "ارسال" ? (
            <TiArrowUpThick color="#18CE2A" size={20} />
          ) : (
            <TiArrowDownThick color="#F75B46" size={20} />
          )}
        </div>
        {/* date - method */}
        <div>
          <span className="block text-sm text-blue-primary font-semiBold">
            {item.date}
          </span>
          <span
            className={`block text-xs font-medium ${
              item.method == "ارسال" ? "text-blue-300" : "text-red-400"
            }`}
          >
            {item.method}
          </span>
        </div>
      </div>
      <div>
        <span className="text-blue-primary font-semiBold block">
          {item.price}
          <span className="text-xs"> تومان</span>
        </span>
        <span className=" text-blue-400 block text-xs">{item.id}</span>
      </div>
    </div>
  );
}
