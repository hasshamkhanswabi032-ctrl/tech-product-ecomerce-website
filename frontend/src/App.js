import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import "./App.css";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/products" />} />
            <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/products" />} />
            <Route path="/products" element={user ? <ProductsPage /> : <Navigate to="/login" />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/login" />} />
            <Route path="/admin" element={user && user.isAdmin ? <AdminPage /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;