// api/transactionApi.js
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
    return data;  // Assuming this returns an array of transaction objects
  }
  