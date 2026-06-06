import { useState, useEffect } from "react";
import {
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Catalog from "./pages/Catalog";
import Authors from "./pages/Authors";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AdminRoute from "./components/AdminRoute";

import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  /* ================= CART ================= */
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ================= DARK MODE ================= */
  const [darkMode, setDarkMode] = useState(false);

  /* ================= WISHLIST ================= */
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /* ================= CART COUNT ================= */
  const totalCartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div
      style={{
        background: darkMode ? "#111827" : "#f5f5f5",
        minHeight: "100vh",
        transition: "0.3s"
      }}
    >

      {/* NAVBAR */}
      <Navbar
        cartCount={totalCartItems}
        wishlistCount={wishlist.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* ROUTES */}
      <Routes>

        <Route path="/" element={
          <Home
            wishlist={wishlist}
            setWishlist={setWishlist}
            cart={cart}
            setCart={setCart}
            darkMode={darkMode}
          />
        } />

        <Route path="/book/:id" element={
          <BookDetails setCart={setCart} darkMode={darkMode} />
        } />

        <Route path="/catalog" element={
          <Catalog
            darkMode={darkMode}
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
        } />

        <Route path="/authors" element={<Authors darkMode={darkMode} />} />
        <Route path="/events" element={<Events darkMode={darkMode} />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} />} />

        <Route path="/login" element={<Login darkMode={darkMode} />} />
        <Route path="/register" element={<Register darkMode={darkMode} />} />

        <Route path="/cart" element={
          <Cart cart={cart} setCart={setCart} darkMode={darkMode} />
        } />

        <Route path="/checkout" element={
          <Checkout cart={cart} darkMode={darkMode} />
        } />

        <Route path="/payment" element={
          <Payment darkMode={darkMode} setCart={setCart} />
        } />

        <Route path="/wishlist" element={
          <Wishlist
            wishlist={wishlist}
            setWishlist={setWishlist}
            darkMode={darkMode}
          />
        } />

        {/* ✅ PROTECTED DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
<Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin darkMode={darkMode} />
    </AdminRoute>
  }
/>

      </Routes>

      {/* TOAST */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* FOOTER */}
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;