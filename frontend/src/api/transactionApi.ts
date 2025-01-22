import axios from 'axios';

const token = localStorage.getItem("access_token");

const API_HEADERS = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const buyCrypto = async (cryptoName: string, amount: number) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/buy/",
    { cryptocurrency: cryptoName, amount },
    API_HEADERS
  );
  return response.data;
};

export const sellCrypto = async (cryptoName: string, amount: number) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/sell/",
    { cryptocurrency: cryptoName, amount },
    API_HEADERS
  );
  return response.data;
};

export const exchangeCrypto = async (fromCurrencyId: string, toCurrencyId: string, amount: number) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/exchange/",
    {
      from_currency_id: fromCurrencyId,
      to_currency_id: toCurrencyId,
      amount,
    },
    API_HEADERS
  );
  return response.data;
};



export async function fetchTransactions(token) {
    const response = await fetch("http://127.0.0.1:8000/api/transactions/", {
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
  