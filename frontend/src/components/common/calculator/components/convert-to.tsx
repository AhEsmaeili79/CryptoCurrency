import { useCoins } from "@hooks/use-coins";
import { useExchangeStore } from "@store/exchange";
import LoadingSkeleton from "./loading-skeleton";

export default function ConvertTo() {
  const { data: coins, isLoading } = useCoins("/coins");

  const setTo = useExchangeStore((state) => state.setTo);
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <div>
      <label className="text-blue-primary font-semiBold mb-2 text-sm block">
        تبدیل به
      </label>
      <div className="bg-white border border-gray-200 py-1 px-4 rounded-lg flex gap-4">
        <select
          className="w-full py-1 bg-transparent outline-none"
          onChange={(e) => setTo(e.target.value)}
        >
          <option hidden className="text-right m-4">
            انتخاب کنید
          </option>
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
