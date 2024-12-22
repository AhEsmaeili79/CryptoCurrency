import { useExchangeStore } from "@store/exchange";

export default function Result() {
  const result = useExchangeStore((state) => state.result);
  return result ? (
    <div className="flex gap-2 justify-center text-sm mt-2 text-blue-primary">
      <span>{result} تتر</span>
    </div>
  ) : (
    <></>
  );
}
