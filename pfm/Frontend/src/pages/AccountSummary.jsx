import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AccountSummary.css";

function AccountSummary({ refreshTrigger }) {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAccountSummary = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view account summary.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:4000/api/account-summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSummary(response.data);
    } catch (error) {
      setError("Failed to load account summary.");
      console.error("Error fetching account summary:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch account summary on mount and whenever transactions change
  useEffect(() => {
    fetchAccountSummary();
  }, [refreshTrigger]);

  return (
    <div className="account-summary-container">
      <h2>Account Summary</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <p className="summary-item">Total Income: ₹{summary.totalIncome.toFixed(2)}</p>
          <p className="summary-item">Total Expenses:₹{summary.totalExpenses.toFixed(2)}</p>
          <p className="summary-item">Balance:₹{summary.balance.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}

export default AccountSummary;
