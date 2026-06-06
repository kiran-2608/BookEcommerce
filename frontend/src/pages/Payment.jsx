import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment({ darkMode, setCart }) {
  const navigate = useNavigate();

  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const handlePayment = () => {
    if (method === "upi" && !upiId) {
      alert("Enter UPI ID");
      return;
    }

    if (method === "card") {
      if (!card.number || !card.name || !card.expiry || !card.cvv) {
        alert("Fill all card details");
        return;
      }
    }

    alert("Payment Successful 🎉");

    // clear cart after payment
    setCart([]);

    // go home
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 80px",
        background: darkMode ? "#0f172a" : "#f5f7fb"
      }}
    >
      <h1 style={{ color: darkMode ? "#fff" : "#222" }}>
        💳 Payment Page
      </h1>

      <div
        style={{
          marginTop: "30px",
          background: darkMode ? "#111827" : "#fff",
          padding: "30px",
          borderRadius: "16px"
        }}
      >

        {/* METHOD SELECT */}
        <div style={{ display: "flex", gap: "20px" }}>
          <button onClick={() => setMethod("upi")}>
            UPI
          </button>

          <button onClick={() => setMethod("card")}>
            Card
          </button>
        </div>

        {/* UPI */}
        {method === "upi" && (
          <div style={{ marginTop: "20px" }}>
            <h3>Enter UPI ID</h3>
            <input
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="example@upi"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px"
              }}
            />
          </div>
        )}

        {/* CARD */}
        {method === "card" && (
          <div style={{ marginTop: "20px" }}>
            <h3>Card Details</h3>

            <input
              placeholder="Card Number"
              onChange={(e) =>
                setCard({ ...card, number: e.target.value })
              }
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            />

            <input
              placeholder="Card Holder Name"
              onChange={(e) =>
                setCard({ ...card, name: e.target.value })
              }
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <input
                placeholder="MM/YY"
                onChange={(e) =>
                  setCard({ ...card, expiry: e.target.value })
                }
                style={{ width: "50%", padding: "10px" }}
              />

              <input
                placeholder="CVV"
                onChange={(e) =>
                  setCard({ ...card, cvv: e.target.value })
                }
                style={{ width: "50%", padding: "10px" }}
              />
            </div>
          </div>
        )}

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "14px",
            background: "linear-gradient(90deg,#6a11cb,#2575fc)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Payment;