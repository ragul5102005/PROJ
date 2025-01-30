import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Personal Finance Manager</h1>
      <nav>
        <button onClick={() => navigate('/add-transaction')}>Add Transaction</button>
        <button onClick={() => navigate('/view-transactions')}>View Transactions</button>
        <button onClick={() => navigate('/account-summary')}>Account Summary</button>
        <button onClick={() => navigate('/ai-budget')}>AI Budget Suggestions</button>
        <button onClick={() => navigate('/report')}>Reports</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Home;
