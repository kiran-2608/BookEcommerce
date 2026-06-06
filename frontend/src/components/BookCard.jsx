import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookCard = ({
  book,
  wishlist = [],
  setWishlist,
  cart = [],
  setCart
}) => {

  const navigate = useNavigate();

  if (!book) return null;

  /* ========================================= */
  /* WISHLIST CHECK */
  /* ========================================= */

  const isSaved = wishlist.some(
    (item) => item._id === book._id
  );

  /* ========================================= */
  /* OPEN BOOK PAGE */
  /* ========================================= */

  const openBook = () => {
    navigate(`/book/${book._id}`);
  };

  /* ========================================= */
  /* HANDLE WISHLIST */
  /* ========================================= */

  const handleWishlist = (e) => {

    e.stopPropagation();

    const alreadySaved = wishlist.some(
      (item) => item._id === book._id
    );

    if (alreadySaved) {

      setWishlist(
        wishlist.filter(
          (item) => item._id !== book._id
        )
      );

      toast.info("Removed from Wishlist ❌");

    } else {

      setWishlist([
        ...wishlist,
        book
      ]);

      toast.success("Added to Wishlist ❤️");
    }
  };

  /* ========================================= */
  /* HANDLE CART */
  /* ========================================= */

  const handleCart = (e) => {

    e.stopPropagation();

    const alreadyInCart = cart.some(
      (item) => item._id === book._id
    );

    if (alreadyInCart) {

      toast.info("Already in Cart 🛒");

    } else {

      setCart([
        ...cart,
        {
          ...book,
          quantity: 1
        }
      ]);

      toast.success("Added to Cart 🛒");
    }
  };

  return (
    <div
      onClick={openBook}
      style={{
        borderRadius: "16px",
        background: "#fff",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        overflow: "hidden",
        cursor: "pointer",
        marginBottom: "20px"
      }}
    >

      {/* IMAGE SECTION */}
      <div
        style={{
          position: "relative",
          background: "#f4f6f8",
          padding: "10px"
        }}
      >

        {/* ❤️ WISHLIST BUTTON */}
        <button
          onClick={handleWishlist}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "white",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            zIndex: 10,
            fontSize: "18px"
          }}
        >
          {isSaved ? "❤️" : "🤍"}
        </button>

        {/* BOOK IMAGE */}
        <img
          src={book.image}
          alt={book.title}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "contain"
          }}
        />

      </div>

      {/* CONTENT */}
      <div style={{ padding: "14px" }}>

        <h3>{book.title}</h3>

        <p
          style={{
            color: "#27ae60",
            fontWeight: "bold"
          }}
        >
          ₹{book.price}
        </p>

        <p>👤 {book.author}</p>

        <p>⭐ {book.rating}</p>

        {/* 🛒 CART BUTTON */}
        <button
          onClick={handleCart}
          style={{
            width: "100%",
            padding: "10px",
            background:
              "linear-gradient(90deg,#6a11cb,#2575fc)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default BookCard;