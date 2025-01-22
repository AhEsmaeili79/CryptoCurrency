import React, { useEffect, useState } from "react";
import TransactionItem from "./item";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    async function fetchTransactions() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/transactions/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white card-shadow rounded-2xl p-3">
      <h4 className="font-bold text-blue-primary text-lg bg-white block pb-2">
        معامله‌ها
      </h4>
      <div className="xl:max-h-[29rem] lg:max-h-[39.5rem] h-full overflow-auto">
        {transactions.map((item) => (
          <TransactionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
