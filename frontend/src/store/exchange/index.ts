import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ExchangeState } from "./type";

export const useExchangeStore = create<ExchangeState>()(
  devtools(
    (set) => ({
      params: {
        from: "BTC",
        to: "USDC",
        timestamp: "1636315200",
      },
      result: null,
      setFrom: (payload) =>
        set((state) => ({
          params: {
            from: payload,
            to: state.params.to,
            timestamp: state.params.timestamp,
          },
        })),
      setTo: (payload) =>
        set((state) => ({
          params: {
            from: state.params.from,
            to: payload,
            timestamp: state.params.timestamp,
          },
        })),
      setTimeStamp: (payload) =>
        set((state) => ({
          params: {
            from: state.params.from,
            to: state.params.to,
            timestamp: +payload,
          },
        })),
      setResult: (payload) =>
        set(() => ({
          result: +payload,
        })),
    }),
    { name: "exchangeStore" }
  )
);
