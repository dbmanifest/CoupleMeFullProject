"use client";
import React, { useEffect, useState } from "react";
import { useBalance } from "@/app/context/BalanceContext";
import { formatDate } from "@/lib/formatDate";

const CreditTr: string = "CREDIT";
const DebitTr: string = "DEBIT";

const Transaction = () => {
  const { setBalance } = useBalance(); // Get setBalance from context
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    const response = await fetch("/api/transaction");
    if (!response.ok) {
      setError("Failed to fetch transactions.");
      return;
    }

    const data = await response.json();
    setTransactions(data);
  };

  const createTransaction = async (type: typeof CreditTr | typeof DebitTr) => {
    const response = await fetch("/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 1,
        type: type,
        description: type === "CREDIT" ? "CREDIT" : "DEBIT",
      }),
    });

    if (!response.ok) {
      setError("Failed to create transaction.");
      return;
    }

    const data = await response.json();
    // console.log(data.message);

    // Update balance in context
    setBalance((prev) => {
      return (prev ?? 0) + (type === "CREDIT" ? 1 : -1);
    });

    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions(); // Fetch transactions on mount
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => createTransaction("CREDIT")}
          className="bg-green-500 text-white p-2 rounded"
        >
          Credit Transaction
        </button>
        <button
          onClick={() => createTransaction("DEBIT")}
          className="bg-red-500 text-white p-2 rounded"
        >
          Debit Transaction
        </button>
      </div>
      <div className="bg-gray-700 p-4 rounded shadow-md">
        <table>
          {transactions.map((transaction: any) => (
            <tr key={transaction.id} className="border-b border-gray-300 py-2">
              <td style={{ width: "72%" }}>
                {transaction.amount} {transaction.type}{" "}
              </td>
              <td>{formatDate(transaction.createdAt)}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Transaction;
