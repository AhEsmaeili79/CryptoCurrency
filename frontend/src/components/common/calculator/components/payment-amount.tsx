import { useCoins } from "@hooks/use-coins";
import { useExchangeStore } from "@store/exchange";
import LoadingSkeleton from "./loading-skeleton";

export default function PaymentAmount() {
  const { data: coins, isLoading } = useCoins("/coins");

  const setFrom = useExchangeStore((state) => state.setFrom);
  const setTimeStamp = useExchangeStore((state) => state.setTimeStamp);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="mt-4">
      <label className="text-blue-primary font-semiBold mb-2 text-sm block">
        مقدار
      </label>
      <div className="bg-white border border-gray-200 py-1 px-4 rounded-lg flex gap-4">
        <input
          className="bg-transparent w-2/3 py-2 text-left outline-none placeholder:text-xs placeholder:text-gray-300 placeholder:text-right text-gray-400 text-sm ltr"
          placeholder="مقدار را وارد کنید"
          type="number"
          onChange={(e) => setTimeStamp(e.target.value)}
        />
        <select
          className="w-1/2 bg-transparent outline-none"
          defaultValue=""
          onChange={(e) => setFrom(e.target.value)}
        >
          {coins?.result?.map(({ name }: any) => (
            <option key={name} className="text-left m-4" value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
