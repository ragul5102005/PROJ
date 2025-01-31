import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import ViewTransactions from "./pages/ViewTransactions";
import AccountSummary from "./pages/AccountSummary";
import Budget from "./pages/BudgetSuggestion";
import Report from "./pages/Report";
import Login from "./components/Login";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-container">
        {isLoggedIn && <Navigation onLogout={handleLogout} />}
        <main className={`main-content ${isLoggedIn ? 'with-nav' : ''}`}>
          <Routes>
            <Route
              path="/login"
              element={
                !isLoggedIn ? (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/"
              element={
                isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/add-transaction"
              element={
                isLoggedIn ? <AddTransaction /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/view-transactions"
              element={
                isLoggedIn ? <ViewTransactions /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/account-summary"
              element={
                isLoggedIn ? <AccountSummary /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/ai-budget"
              element={
                isLoggedIn ? <Budget /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/report"
              element={<Report />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
