import React from "react";

function Wishlist({ wishlist, setWishlist, darkMode }) {
  const removeItem = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  return (
    <div className="wishlist-page">

      <h1 className="title">💖 My Wishlist</h1>

      {wishlist.length === 0 ? (
        <h2 className="empty">
          Your wishlist is empty 😢
        </h2>
      ) : (
        wishlist.map((item) => (
          <div key={item._id} className="card">

            {/* REMOVE BUTTON */}
            <button
              className="remove-btn"
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>

            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="img"
            />

            {/* DETAILS */}
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

              <p className="book-info">
                ⭐ {item.rating}
              </p>
            </div>

          </div>
        ))
      )}

      <style>{`
        .wishlist-page{
          padding:30px;
          min-height:100vh;
          background:${darkMode ? "#111827" : "#f5f7fb"};
        }

        .title{
          margin-bottom:20px;
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

        .remove-btn{
          position:absolute;
          top:15px;
          right:15px;
          background:red;
          color:white;
          border:none;
          padding:6px 12px;
          border-radius:6px;
          cursor:pointer;
          font-weight:bold;
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

        /* FIXED TEXT COLORS */
        .book-title{
          color:${darkMode ? "#ffffff" : "#111"};
          margin-bottom:10px;
        }

        .book-info{
          color:${darkMode ? "#d1d5db" : "#555"};
          margin:6px 0;
        }

        .price{
          color:${darkMode ? "#86efac" : "#16a34a"};
          margin:8px 0;
        }

        /* MOBILE FIX */
        @media (max-width:768px){

          .wishlist-page{
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

export default Wishlist;