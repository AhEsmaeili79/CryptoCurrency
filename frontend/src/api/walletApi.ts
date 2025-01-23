import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const fetchWalletData = async (accessToken: string) => {
  try {
    const response = await axios.get(`${API_URL}/wallet/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data.reduce((acc: Wallet, item: any) => {
      acc[item.cryptocurrency.symbol] = item.balance;
      return acc;
    }, {});
  } catch (err) {
    throw new Error("برای نمایش کیف پول وارد شوید");
  }
};



export const fetchUsdBalance = async (accessToken: string) => {
  try {
    const response = await axios.get(`${API_URL}/wallet/money_usd/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.balance;
  } catch (err) {
    throw new Error("برای نمایش کیف پول وارد شوید");
  }
};
