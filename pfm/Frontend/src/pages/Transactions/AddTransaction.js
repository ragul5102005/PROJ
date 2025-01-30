import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTransaction = () => {
  const [transaction, setTransaction] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/transactions', transaction, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/view-transactions');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="add-transaction-container">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type:</label>
          <select name="type" value={transaction.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={transaction.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={transaction.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Transaction</button>
        <button type="button" onClick={() => navigate('/')}>Back to Home</button>
      </form>
    </div>
  );
};

export default AddTransaction;
