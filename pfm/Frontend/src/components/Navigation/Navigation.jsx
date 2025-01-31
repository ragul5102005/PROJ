import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import dashboardIcon from '../../assets/icons/dashboard.svg';
import transactionIcon from '../../assets/icons/transaction.svg';
import budgetIcon from '../../assets/icons/budget.svg';
import reportIcon from '../../assets/icons/report.svg';
import logoutIcon from '../../assets/icons/logout.svg';

const Navigation = ({ onLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
       {/* <img src="/logo.png" alt="PFM Logo" className="nav-logo" /> */}
        <h1>Personal Finance</h1>
      </div>
      
      <div className="nav-links">
        <Link to="/" className={`nav-item ${isActive('/')}`}>
          <img src={dashboardIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </Link>
        
        <Link to="/add-transaction" className={`nav-item ${isActive('/add-transaction')}`}>
          <img src={transactionIcon} alt="Add Transaction" />
          <span>Add Transaction📩</span>
        </Link>
        
        <Link to="/view-transactions" className={`nav-item ${isActive('/view-transactions')}`}>
          <img src={transactionIcon} alt="View Transactions" />
          <span>Transactions</span>
        </Link>
        
        <Link to="/account-summary" className={`nav-item ${isActive('/account-summary')}`}>
          <img src={dashboardIcon} alt="Account Summary" />
          <span>Account Summary🗒️</span>
        </Link>
        
        <Link to="/ai-budget" className={`nav-item ${isActive('/ai-budget')}`}>
          <img src={budgetIcon} alt="AI Budget" />
          <span>Budget</span>
        </Link>
        
        <Link to="/report" className={`nav-item ${isActive('/report')}`}>
          <img src={reportIcon} alt="Reports" />
          <span>Reports</span>
        </Link>
      </div>
      
      <div className="nav-footer">
        <button onClick={onLogout} className="logout-button">
          <img src={logoutIcon} alt="Logout" />
          <span>Logout😒</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
