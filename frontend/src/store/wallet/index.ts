import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { WalletState } from "./type";

export const useWallet = create<WalletState>()(
  devtools(
    (set) => ({
      time: "priceChange1d",
      setTime: (payload) => set(() => ({ time: payload })),
    }),
    { name: "walletStore" }
  )
);
