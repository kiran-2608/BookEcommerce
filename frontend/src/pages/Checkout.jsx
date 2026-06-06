import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart, darkMode }) {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePayNow = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1200);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setCart([]);

    setTimeout(() => {
      setEmailSent(true);
    }, 1500);
  };

  const goHome = () => navigate("/");

  const theme = darkMode
    ? {
        bg: "#0f1111",
        card: "#161b1b",
        text: "#f5f5f5",
        sub: "#b8b8b8",
        border: "#2f3535",
        glow:
          "0 0 0 1px rgba(255,255,255,0.08), 0 6px 25px rgba(0,0,0,0.45)"
      }
    : {
        bg: "#eaeded",
        card: "#ffffff",
        text: "#111111",
        sub: "#666666",
        border: "#ddd",
        glow: "0 0 0 1px rgba(0,0,0,0.06)"
      };

  return (
    <div style={{ ...pageStyle, background: theme.bg, color: theme.text }}>

      {/* PROGRESS */}
      <div
        style={{
          ...progressWrapper,
          background: theme.card,
          borderBottom: `1px solid ${theme.border}`,
          boxShadow: theme.glow
        }}
      >
        <div style={progressBar}>
          <Step label="Address" active={step >= 1} darkMode={darkMode} />
          <Line active={step > 1} />
          <Step label="Payment" active={step >= 2} darkMode={darkMode} />
          <Line active={step > 2} />
          <Step label="Review" active={step >= 3} darkMode={darkMode} />
        </div>
      </div>

      <h2 style={{ textAlign: "center", color: theme.text }}>
        Checkout
      </h2>

      <div style={container}>

        {/* LEFT */}
        <div style={{ flex: 2 }}>

          {/* ADDRESS */}
          <div style={{
            ...card,
            background: theme.card,
            border: `1px solid ${theme.border}`,
            boxShadow: theme.glow,
            marginBottom: 25
          }}>
            <h3 style={{ color: theme.text }}>1. Delivery Address</h3>

            {step === 1 && (
              <>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter full address"
                  style={{
                    ...input,
                    background: darkMode ? "#0f1414" : "#fff",
                    color: theme.text,
                    border: `1px solid ${theme.border}`
                  }}
                />

                <button
                  style={btn}
                  onClick={() => {
                    if (!address.trim()) return alert("Enter address");
                    setStep(2);
                  }}
                >
                  Deliver to this address
                </button>
              </>
            )}

            {step > 1 && (
              <p style={{ color: theme.sub }}>📍 {address}</p>
            )}
          </div>

          {/* PAYMENT */}
          <div style={{
            ...card,
            background: theme.card,
            border: `1px solid ${theme.border}`,
            boxShadow: theme.glow,
            marginBottom: 25
          }}>
            <h3 style={{ color: theme.text }}>2. Payment Method</h3>

            {step < 2 ? (
              <p style={{ color: theme.sub }}>Select address first</p>
            ) : (
              <>
                <label style={{ color: theme.text }}>
                  <input
                    type="radio"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                  /> UPI
                </label>

                <label style={{ marginLeft: 20, color: theme.text }}>
                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  /> Card
                </label>

                <button style={btn} onClick={handlePayNow}>
                  Continue
                </button>

                {loading && (
                  <p style={{ color: theme.sub }}>🔄 Processing...</p>
                )}
              </>
            )}
          </div>

          {/* REVIEW */}
          {step === 3 && !orderPlaced && (
            <div style={{
              ...card,
              background: theme.card,
              border: `1px solid ${theme.border}`,
              boxShadow: theme.glow,
              marginBottom: 25
            }}>
              <h3 style={{ color: theme.text }}>3. Review Order</h3>
              <button style={btn} onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          )}

          {/* SUCCESS */}
          {orderPlaced && (
            <div style={{
              background: theme.card,
              padding: 30,
              borderRadius: 10,
              marginTop: 20,
              textAlign: "center",
              border: `2px solid #22c55e`,
              boxShadow: theme.glow
            }}>
              <h2 style={{
                color: darkMode ? "#f5f5f5" : "#111111"
              }}>
                🎉 Order Placed!
              </h2>

              {!emailSent ? (
                <p style={{ color: darkMode ? "#b8b8b8" : "#666666" }}>
                  📩 Sending email confirmation...
                </p>
              ) : (
                <p style={{ color: "#22c55e", fontWeight: "bold" }}>
                  📩 Email sent successfully!
                </p>
              )}

              {emailSent && (
                <button style={btn} onClick={goHome}>
                  Go to Home
                </button>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SUMMARY (IMPROVED SPACING) */}
        <div style={{
          ...summary,
          background: theme.card,
          border: `1px solid ${theme.border}`,
          boxShadow: theme.glow,
          padding: 28
        }}>
          <h3 style={{ color: theme.text, marginBottom: 18 }}>
            Order Summary
          </h3>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}>
            {cart.map((item) => (
              <div key={item.id} style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: 12,
                borderBottom: `1px dashed ${theme.border}`
              }}>
                <div>
                  <div style={{ color: theme.text }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 12, color: theme.sub }}>
                    Qty: {item.quantity}
                  </div>
                </div>

                <div style={{ color: "#22c55e", fontWeight: 600 }}>
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            height: 1,
            background: theme.border,
            margin: "18px 0"
          }} />

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            color: theme.text
          }}>
            <b>Total</b>
            <b>₹{totalPrice}</b>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= STEP ================= */
function Step({ label, active, darkMode }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: active ? "#6a11cb" : "#555",
        margin: "0 auto",
        color: "#fff",
        fontSize: 12,
        lineHeight: "26px"
      }}>✓</div>

      <div style={{
        fontSize: 12,
        marginTop: 4,
        color: darkMode ? "#b8b8b8" : "#333"
      }}>
        {label}
      </div>
    </div>
  );
}

function Line({ active }) {
  return (
    <div style={{
      flex: 1,
      height: 2,
      background: active ? "#6a11cb" : "#555",
      margin: "0 10px"
    }} />
  );
}

/* ================= STYLES ================= */

const pageStyle = {
  minHeight: "100vh",
  paddingBottom: 40
};

const progressWrapper = {
  position: "sticky",
  top: 0,
  padding: "15px 20px",
  zIndex: 100
};

const progressBar = {
  display: "flex",
  alignItems: "center",
  maxWidth: 700,
  margin: "auto"
};

const container = {
  display: "flex",
  gap: 25,
  maxWidth: 1100,
  margin: "20px auto"
};

const card = {
  padding: 25,
  borderRadius: 10
};

const summary = {
  flex: 1,
  borderRadius: 10,
  position: "sticky",
  top: 80,
  height: "fit-content"
};

const input = {
  width: "100%",
  padding: 10,
  marginTop: 10,
  borderRadius: 6,
  border: "1px solid #ccc"
};

const btn = {
  width: "100%",
  padding: 12,
  marginTop: 15,
  background: "linear-gradient(90deg,#6a11cb,#2575fc)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold"
};

export default Checkout;