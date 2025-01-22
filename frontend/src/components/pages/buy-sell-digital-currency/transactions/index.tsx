import { useEffect, useState } from "react";
import TransactionItem from "./item";
import { fetchTransactions } from "@api/transactionApi";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    async function getTransactions() {
      try {
        setLoading(true); // Ensure loading is true while fetching
        const data = await fetchTransactions(token); // Use the imported fetchTransactions function
        setTransactions(data); // Set the transactions once data is fetched
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false); // Ensure loading is false after fetching completes
      }
    }

    getTransactions(); // Call the function to fetch transactions
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
