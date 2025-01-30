import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-transactions-container">
      <h2>Transactions History</h2>
      <div className="transactions-list">
        {transactions.map((transaction) => (
          <div key={transaction._id} className="transaction-item">
            <div className="transaction-info">
              <h3>{transaction.description}</h3>
              <p>Amount: ${transaction.amount}</p>
              <p>Type: {transaction.type}</p>
              <p>Category: {transaction.category}</p>
              <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
            </div>
            <div className="transaction-actions">
              <button onClick={() => handleDelete(transaction._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default ViewTransactions;
