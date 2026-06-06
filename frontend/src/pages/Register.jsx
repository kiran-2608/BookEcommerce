import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Register = ({ darkMode }) => {

  const [form, setForm] = useState({

    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  // LOADING STATE

  const [loading, setLoading] =
    useState(false);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ================= HANDLE SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    // VALIDATION

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {

      toast.error(
        "⚠️ Please fill all fields"
      );

      return;
    }

    // EMAIL VALIDATION

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(form.email)
    ) {

      toast.error(
        "❌ Invalid email"
      );

      return;
    }

    // PASSWORD MATCH

    if (
      form.password !==
      form.confirmPassword
    ) {

      toast.error(
        "❌ Passwords do not match"
      );

      return;
    }

    try {

      setLoading(true);

      // AXIOS API REQUEST

      const response =
        await axios.post(

          "http://localhost:5000/register",

          {
            name: form.name,
            email: form.email,
            password: form.password
          }
        );

      // SUCCESS

      toast.success(
        response.data.message
      );

      console.log(response.data);

      // CLEAR FORM

      setForm({

        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "❌ Server Error"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={pageStyle(darkMode)}>

      <motion.div

        style={cardStyle(darkMode)}

        initial={{
          opacity: 0,
          y: 60
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.5
        }}
      >

        <h2 style={titleStyle(darkMode)}>
          📝 Create Account
        </h2>

        <p style={subTitle(darkMode)}>
          Register to continue
        </p>

        {/* NAME */}

        <input
          name="name"

          placeholder="Full Name"

          value={form.name}

          onChange={handleChange}

          style={inputStyle(darkMode)}
        />

        {/* EMAIL */}

        <input
          type="email"

          name="email"

          placeholder="Email"

          value={form.email}

          onChange={handleChange}

          style={inputStyle(darkMode)}
        />

        {/* PASSWORD */}

        <div style={wrapper}>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }

            name="password"

            placeholder="Password"

            value={form.password}

            onChange={handleChange}

            style={inputStyle(darkMode)}
          />

          <span
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }

            style={eye}
          >
            {showPassword
              ? "🙈"
              : "👁️"}
          </span>

        </div>

        {/* CONFIRM PASSWORD */}

        <div style={wrapper}>

          <input
            type={
              showConfirm
                ? "text"
                : "password"
            }

            name="confirmPassword"

            placeholder="Confirm Password"

            value={
              form.confirmPassword
            }

            onChange={handleChange}

            style={inputStyle(darkMode)}
          />

          <span
            onClick={() =>
              setShowConfirm(
                !showConfirm
              )
            }

            style={eye}
          >
            {showConfirm
              ? "🙈"
              : "👁️"}
          </span>

        </div>

        {/* BUTTON */}

        <button

          onClick={handleSubmit}

          disabled={loading}

          style={{
            ...buttonStyle,

            opacity:
              loading ? 0.7 : 1
          }}

          onMouseEnter={(e) =>
            (e.target.style.transform =
              "scale(1.03)")
          }

          onMouseLeave={(e) =>
            (e.target.style.transform =
              "scale(1)")
          }
        >

          {loading
            ? "Registering..."
            : "🚀 Register"}

        </button>

        {/* LOGIN LINK */}

        <p
          style={{
            textAlign: "center",

            marginTop: "18px",

            fontSize: "14px",

            color: darkMode
              ? "#ffffff"
              : "#4b5563",

            fontWeight: "500"
          }}
        >

          Already have an account?{" "}

          <a
            href="/login"

            style={{
              color: "#a855f7",

              fontWeight: "700",

              textDecoration: "none",

              transition: "0.3s"
            }}
          >
            Login
          </a>

        </p>

      </motion.div>

    </div>
  );
};

/* ================= PAGE ================= */

const pageStyle = (darkMode) => ({

  minHeight: "100vh",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding: "20px",

  background: darkMode
    ? "#050816"
    : "#f5f7fb"
});

/* ================= CARD ================= */

const cardStyle = (darkMode) => ({

  width: "100%",

  maxWidth: "400px",

  padding:
    window.innerWidth < 480
      ? "25px"
      : "40px",

  borderRadius: "18px",

  background: darkMode
    ? "#0f172a"
    : "#ffffff",

  border: darkMode
    ? "1px solid #8b5cf6"
    : "1px solid #e5e7eb",

  boxShadow: darkMode
    ? "0 0 25px rgba(139,92,246,0.4)"
    : "0 10px 20px rgba(0,0,0,0.1)",

  color: darkMode
    ? "#ffffff"
    : "#111827"
});

/* ================= TEXT ================= */

const titleStyle = (darkMode) => ({

  textAlign: "center",

  marginBottom: "5px",

  fontSize:
    window.innerWidth < 480
      ? "24px"
      : "30px",

  color: darkMode
    ? "#ffffff"
    : "#111827"
});

const subTitle = (darkMode) => ({

  textAlign: "center",

  marginBottom: "20px",

  color: darkMode
    ? "#cbd5e1"
    : "#555"
});

/* ================= INPUTS ================= */

const inputStyle = (darkMode) => ({

  width: "100%",

  padding: "14px",

  marginBottom: "15px",

  borderRadius: "12px",

  border: darkMode
    ? "1px solid #8b5cf6"
    : "1px solid #ccc",

  background: darkMode
    ? "#020617"
    : "#fff",

  color: darkMode
    ? "#fff"
    : "#111827",

  outline: "none",

  fontSize: "15px"
});

/* ================= PASSWORD ================= */

const wrapper = {
  position: "relative"
};

const eye = {

  position: "absolute",

  right: "12px",

  top: "35%",

  cursor: "pointer",

  fontSize: "18px",

  color: "#a78bfa"
};

/* ================= BUTTON ================= */

const buttonStyle = {

  width: "100%",

  padding: "13px",

  borderRadius: "12px",

  border: "none",

  background:
    "linear-gradient(90deg,#7c3aed,#2563eb)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",

  transition: "0.3s",

  marginTop: "5px",

  fontSize: "15px"
};

export default Register;