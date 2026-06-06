import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Catalog = ({
  darkMode,
  cart = [],
  setCart,
  wishlist = [],
  setWishlist
}) => {

  const [books, setBooks] = useState([]);

  // 📚 CATEGORY FILTER
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // 📥 FETCH BOOKS
  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/books"
        );

        setBooks(res.data.books);

      } catch (error) {

        console.log(error);

      }

    };

    fetchBooks();

  }, []);

  // 📚 CATEGORY DATA
  const categories = [
    { name: "All", emoji: "📚" },
    { name: "Physics", emoji: "📘" },
    { name: "Mathematics", emoji: "🧮" },
    { name: "Biology", emoji: "🧬" },
    { name: "Computer Science", emoji: "💻" },
    { name: "English", emoji: "📖" },
    { name: "Social", emoji: "🌍" }
  ];

  // ❤️ WISHLIST
  const handleWishlist = (book) => {

    const alreadySaved = wishlist.some(
      (item) => item._id === book._id
    );

    if (alreadySaved) {

      setWishlist(
        wishlist.filter(
          (item) => item._id !== book._id
        )
      );

      toast.info(
        "Removed from Wishlist ❌"
      );

    } else {

      setWishlist([
        ...wishlist,
        book
      ]);

      toast.success(
        "Added to Wishlist ❤️"
      );

    }
  };

  // 🛒 CART
  const handleCart = (book) => {

    const alreadyInCart = cart.some(
      (item) => item._id === book._id
    );

    if (alreadyInCart) {

      toast.info(
        "Already in Cart 🛒"
      );

    } else {

      setCart([
        ...cart,
        {
          ...book,
          quantity: 1
        }
      ]);

      toast.success(
        "Added to Cart 🛒"
      );

    }
  };

  return (

    <div
      style={{
        padding: "20px",
        background: darkMode
          ? "#111827"
          : "#f5f7fb",
        minHeight: "100vh"
      }}
    >

      {/* TITLE */}

      <h1
        style={{
          color: darkMode
            ? "white"
            : "#111827",
          marginBottom: "30px",
          textAlign:"center"
        }}
      >
        📚 Book Catalog
      </h1>


      {/* CATEGORIES */}

      <h2
        style={{
          color: darkMode
            ? "white"
            : "#222",
          marginBottom: "20px"
        }}
      >
        📚 Explore Categories
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: "20px",
          marginBottom: "50px"
        }}
      >

        {categories.map(
          (category, index) => {

            const totalBooks =
              category.name === "All"
                ? books.length
                : books.filter(
                    (book) =>
                      book.category
                        ?.toLowerCase()
                        .trim() ===
                      category.name
                        .toLowerCase()
                        .trim()
                  ).length;

            return (

              <div
                key={index}
                onClick={() =>
                  setSelectedCategory(
                    category.name
                  )
                }

                style={{

                  background:
                    selectedCategory ===
                    category.name
                      ? "#6a11cb"
                      : darkMode
                      ? "#1f2937"
                      : "white",

                  color:
                    selectedCategory ===
                    category.name
                      ? "white"
                      : darkMode
                      ? "white"
                      : "#222",

                  padding: "25px",
                  borderRadius: "18px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition:"0.3s",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08)"
                }}

                onMouseEnter={(e)=>{
                  e.currentTarget.style.transform =
                  "translateY(-8px)";
                }}

                onMouseLeave={(e)=>{
                  e.currentTarget.style.transform =
                  "translateY(0)";
                }}

              >

                <div
                  style={{
                    fontSize: "45px",
                    marginBottom: "12px"
                  }}
                >
                  {category.emoji}
                </div>

                <h3>
                  {category.name}
                </h3>

                <p>
                  {totalBooks} Books
                </p>

              </div>

            );
          }
        )}

      </div>


      {/* BOOKS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px"
        }}
      >

        {books

          .filter((book) =>
            selectedCategory === "All"
              ? true
              : book.category
                  ?.toLowerCase()
                  .trim() ===
                selectedCategory
                  .toLowerCase()
                  .trim()
          )

          .map((book) => {

            const isSaved =
              wishlist.some(
                (item) =>
                  item._id ===
                  book._id
              );

            return (

              <div
                key={book._id}

                style={{
                  background:
                    darkMode
                      ? "#1f2937"
                      : "white",

                  padding: "20px",

                  borderRadius: "18px",

                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08)",

                  position:
                    "relative",

                  transition:"0.3s"
                }}

                onMouseEnter={(e)=>{
                  e.currentTarget.style.transform =
                  "translateY(-8px)";
                }}

                onMouseLeave={(e)=>{
                  e.currentTarget.style.transform =
                  "translateY(0)";
                }}
              >

                {/* ❤️ */}

                <button
                  onClick={() =>
                    handleWishlist(
                      book
                    )
                  }

                  style={{

                    position:
                      "absolute",

                    top: "15px",

                    right: "15px",

                    width: "38px",

                    height: "38px",

                    borderRadius:
                      "50%",

                    border: "none",

                    cursor:
                      "pointer",

                    background:
                      "white",

                    fontSize:
                      "18px"
                  }}
                >

                  {isSaved
                    ? "❤️"
                    : "🤍"}

                </button>


                <img
                  src={book.image}
                  alt={book.title}

                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit:
                      "contain",

                    marginBottom:
                      "15px"
                  }}
                />

                <h3
                  style={{
                    color:
                      darkMode
                        ? "white"
                        : "#222"
                  }}
                >
                  {book.title}
                </h3>

                <p
                  style={{
                    color:
                      darkMode
                        ? "#d1d5db"
                        : "#555"
                  }}
                >
                  👤 {book.author || "Unknown"}
                </p>

                <p
                  style={{
                    color:
                      "#27ae60",
                    fontWeight:
                      "bold"
                  }}
                >
                  ₹{book.price}
                </p>

                <p
                  style={{
                    color:
                      "#f39c12",

                    marginBottom:
                      "15px"
                  }}
                >
                  ⭐ {book.rating}
                </p>

                <button
                  onClick={() =>
                    handleCart(
                      book
                    )
                  }

                  style={{

                    width: "100%",

                    padding:
                      "10px",

                    border:
                      "none",

                    borderRadius:
                      "10px",

                    background:
                      "linear-gradient(90deg,#6a11cb,#2575fc)",

                    color:
                      "white",

                    fontWeight:
                      "bold",

                    cursor:
                      "pointer"
                  }}
                >
                  🛒 Add to Cart
                </button>

              </div>

            );

          })}

      </div>

    </div>

  );

};

export default Catalog;