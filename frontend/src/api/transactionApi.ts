import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const token = localStorage.getItem("access_token");

const API_HEADERS = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const buyCrypto = async (cryptoName: string, amount: number) => {
  const response = await axios.post(
    `${API_URL}/buy/`,
    { cryptocurrency: cryptoName, amount },
    API_HEADERS
  );
  return response.data;
};

export const sellCrypto = async (cryptoName: string, amount: number) => {
  const response = await axios.post(
    `${API_URL}/sell/`,
    { cryptocurrency: cryptoName, amount },
    API_HEADERS
  );
  return response.data;
};

export const exchangeCrypto = async (fromCurrencyId: string, toCurrencyId: string, amount: number) => {
  const response = await axios.post(
    `${API_URL}/exchange/`,
    {
      from_currency_id: fromCurrencyId,
      to_currency_id: toCurrencyId,
      amount,
    },
    API_HEADERS
  );
  return response.data;
};



export async function fetchTransactions(token:string) {
    const response = await fetch(`${API_URL}/transactions/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
  
    const data = await response.json();
    return data;  
  }
  