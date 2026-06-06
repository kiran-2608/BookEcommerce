import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart, darkMode }) {
  const navigate = useNavigate();

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) =>
      prev.filter(
        (item) => item._id !== id
      )
    );
  };

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <h1 className="title">
        🛒 My Cart
      </h1>

      {cart.length === 0 ? (
        <h2 className="empty">
          Your cart is empty 😢
        </h2>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="card"
            >

              {/* REMOVE BUTTON */}
              <button
                onClick={() =>
                  removeItem(item._id)
                }
                className="remove-btn"
              >
                Remove
              </button>

              <img
                src={item.image}
                alt={item.title}
                className="img"
              />

              <div className="details">

                <h2 className="book-title">
                  {item.title}
                </h2>

                <p className="book-info">
                  👤 {item.author}
                </p>

                <h3 className="price">
                  ₹{item.price}
                </h3>

                <div className="qty-box">

                  <button
                    onClick={() =>
                      decreaseQuantity(
                        item._id
                      )
                    }
                    className="qty-btn"
                  >
                    -
                  </button>

                  <span className="qty">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(
                        item._id
                      )
                    }
                    className="qty-btn"
                  >
                    +
                  </button>

                </div>

                <p className="subtotal">
                  Subtotal: ₹
                  {item.price *
                    item.quantity}
                </p>

              </div>

            </div>
          ))}

          <div className="total-box">

            <h2 className="total-text">
              Total: ₹{totalPrice}
            </h2>

            <button
              onClick={() =>
                navigate(
                  "/checkout"
                )
              }
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>

          </div>
        </>
      )}

      <style>{`

        .cart-page{
          padding:30px;
          min-height:100vh;
          background:${darkMode ? "#111827" : "#f5f7fb"};
        }

        .title{
          margin-bottom:25px;
          color:${darkMode ? "white" : "#222"};
        }

        .empty{
          color:${darkMode ? "#d1d5db" : "#444"};
        }

        .card{
          display:flex;
          gap:20px;
          align-items:center;
          background:${darkMode ? "#1f2937" : "#fff"};
          padding:20px;
          border-radius:16px;
          margin-bottom:20px;
          box-shadow:0 4px 12px rgba(0,0,0,0.08);
          position:relative;
        }

        .img{
          width:120px;
          height:160px;
          object-fit:contain;
          background:${darkMode ? "#374151" : "#f4f6f8"};
          padding:10px;
          border-radius:10px;
        }

        .details{
          flex:1;
        }

        .book-title{
          color:${darkMode ? "#ffffff" : "#111"};
          margin-bottom:8px;
        }

        .book-info{
          color:${darkMode ? "#d1d5db" : "#555"};
        }

        .price{
          color:${darkMode ? "#86efac" : "#16a34a"};
          margin:10px 0;
        }

        .subtotal{
          color:${darkMode ? "#d1d5db" : "#444"};
          margin-top:10px;
          font-weight:600;
        }

        .total-text{
          color:${darkMode ? "#ffffff" : "#111"};
        }

        .qty-box{
          display:flex;
          align-items:center;
          gap:10px;
          margin-top:10px;
        }

        .qty-btn{
          padding:6px 14px;
          border-radius:6px;
          border:none;
          background:${darkMode ? "#374151" : "#f5f3ff"};
          color:${darkMode ? "#d1d5db" : "#7c3aed"};
          font-weight:bold;
          cursor:pointer;
        }

        .qty{
          font-weight:bold;
          color:${darkMode ? "#d1d5db" : "#222"};
        }

        .remove-btn{
          position:absolute;
          top:15px;
          right:15px;
          background:linear-gradient(90deg,#dc2626,#ef4444);
          color:white;
          border:none;
          padding:8px 14px;
          border-radius:8px;
          cursor:pointer;
        }

        .total-box{
          margin-top:25px;
          padding:20px;
          background:${darkMode ? "#1f2937" : "#fff"};
          border-radius:16px;
        }

        .checkout-btn{
          margin-top:15px;
          width:100%;
          padding:14px;
          background:linear-gradient(90deg,#6a11cb,#2575fc);
          color:white;
          border:none;
          border-radius:10px;
          font-weight:bold;
          cursor:pointer;
        }

        @media (max-width:768px){

          .cart-page{
            padding:15px;
          }

          .card{
            flex-direction:column;
            align-items:flex-start;
          }

          .img{
            width:100%;
            height:200px;
          }

          .qty-box{
            flex-wrap:wrap;
          }

          .checkout-btn{
            font-size:14px;
          }

          .remove-btn{
            top:10px;
            right:10px;
            font-size:12px;
          }
        }

      `}</style>

    </div>
  );
}

export default Cart;