import axios from "axios";

export const fetchWalletData = async (accessToken: string) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/wallet/", {
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
