import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = ({ darkMode }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Please fill all fields");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/login", form);
      login(res.data.token, res.data.user);
      toast.success("Welcome back! 🚀");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle(darkMode)}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={cardStyle(darkMode)}
      >
        <div style={headerStyle}>
          <h2 style={{ margin: 0, fontSize: "1.75rem" }}>Welcome back</h2>
          <p style={{ color: "#64748b", marginTop: "8px" }}>Enter your details to access your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Email Address</label>
          <input 
            type="email" name="email" value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            style={inputStyle(darkMode)} placeholder="name@company.com"
          />

          <label style={labelStyle}>Password</label>
          <div style={{ position: "relative" }}>
            <input 
              type={showPassword ? "text" : "password"} name="password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              style={inputStyle(darkMode)} placeholder="••••••••"
            />
            <span onClick={() => setShowPassword(!showPassword)} style={eyeStyle}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Authenticating..." : "Sign in"}
          </button>
        </form>

        <p style={footerStyle}>
          Don't have an account? <a href="/register" style={linkStyle}>Create one</a>
        </p>
      </motion.div>
    </div>
  );
};

/* ================= PROFESSIONAL STYLES ================= */

const containerStyle = (darkMode) => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: darkMode ? "#0f172a" : "#f8fafc",
  padding: "20px"
});

const cardStyle = (darkMode) => ({
  width: "100%",
  maxWidth: "400px",
  padding: "40px",
  borderRadius: "20px",
  background: darkMode ? "#1e293b" : "#ffffff",
  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
  color: darkMode ? "#f8fafc" : "#1e293b"
});

const headerStyle = { marginBottom: "30px", textAlign: "left" };

const labelStyle = { 
  display: "block", 
  marginBottom: "8px", 
  fontSize: "0.875rem", 
  fontWeight: "500" 
};

const inputStyle = (darkMode) => ({
  width: "100%",
  padding: "12px 16px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
  background: darkMode ? "#0f172a" : "#ffffff",
  color: darkMode ? "#f8fafc" : "#1e293b",
  fontSize: "1rem",
  boxSizing: "border-box" // Crucial for padding consistency
});

const eyeStyle = {
  position: "absolute", right: "16px", top: "12px", cursor: "pointer", opacity: 0.6
};

const buttonStyle = {
  width: "100%", padding: "14px", borderRadius: "10px", border: "none",
  background: "#4f46e5", color: "white", fontWeight: "600",
  fontSize: "1rem", cursor: "pointer", transition: "background 0.2s"
};

const footerStyle = { textAlign: "center", marginTop: "20px", fontSize: "0.9rem" };
const linkStyle = { color: "#4f46e5", textDecoration: "none", fontWeight: "600" };

export default Login;