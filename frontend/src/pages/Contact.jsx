import { useState } from "react";
import { toast } from "react-toastify";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = ({ darkMode }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully 🚀");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page(darkMode)}>
      <h1 style={styles.title(darkMode)}>📞 Contact Us</h1>

      <div style={styles.container}>

        {/* LEFT CARD */}
        <div style={styles.card(darkMode)}>
          <h2 style={styles.heading}>📍 Contact Info</h2>

          <div style={styles.infoBox(darkMode)}>
            <FaPhone style={styles.icon} />
            <div>
              <b>Phone</b>
              <p>+91 9823657865</p>
            </div>
          </div>

          <div style={styles.infoBox(darkMode)}>
            <FaEnvelope style={styles.icon} />
            <div>
              <b>Email</b>
              <p>thukkapurambhavani@gmail.com</p>
            </div>
          </div>

          <div style={styles.infoBox(darkMode)}>
            <FaMapMarkerAlt style={styles.icon} />
            <div>
              <b>Address</b>
              <p>Hyderabad, India</p>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form onSubmit={handleSubmit} style={styles.card(darkMode)}>
          
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input(darkMode)}
          />

          <input
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input(darkMode)}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={form.message}
            onChange={handleChange}
            style={styles.textarea(darkMode)}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Sending..." : "🚀 Send Message"}
          </button>
        </form>

      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  page: (darkMode) => ({
    minHeight: "100vh",
    padding: "40px 15px",
    background: darkMode
      ? "linear-gradient(135deg,#070b14,#111827)"
      : "#f5f7fb",
    color: darkMode ? "#fff" : "#111",
    boxSizing: "border-box"
  }),

  title: (darkMode) => ({
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold"
  }),

  /* ✅ MOBILE FRIENDLY GRID */
  container: {
    maxWidth: "1000px",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },

  /* CARD */
  card: (darkMode) => ({
    background: darkMode ? "#111827" : "#fff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxSizing: "border-box",
    overflow: "hidden"
  }),

  heading: {
    marginBottom: "10px",
    fontSize: "20px"
  },

  infoBox: (darkMode) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderRadius: "10px",
    background: darkMode ? "#0b1220" : "#f1f5f9"
  }),

  icon: {
    fontSize: "18px",
    color: "#6a11cb"
  },

  /* 🔥 FIXED INPUTS (NO OVERFLOW) */
  input: (darkMode) => ({
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid rgba(106,17,203,0.3)",
    background: darkMode ? "#0b1220" : "#fff",
    color: darkMode ? "#fff" : "#111",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box"
  }),

  textarea: (darkMode) => ({
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid rgba(106,17,203,0.3)",
    background: darkMode ? "#0b1220" : "#fff",
    color: darkMode ? "#fff" : "#111",
    resize: "none",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box"
  }),

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#6a11cb,#2575fc)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
  }
};

export default Contact;