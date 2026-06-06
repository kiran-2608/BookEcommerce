import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useState,
  useEffect
} from "react";

const BookDetails = ({
  setCart,
  darkMode
}) => {

  const { id } = useParams();

  /* ================= STATES ================= */

  const [book, setBook] =
    useState(null);

  const [activeTab, setActiveTab] =
    useState("book");

  const [expanded, setExpanded] =
    useState(false);

  /* ================= FETCH BOOK ================= */

  useEffect(() => {

    const fetchBook = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/books/${id}`
        );

        setBook(res.data.book);

      } catch (error) {

        console.log(
          "❌ Error fetching book:",
          error
        );
      }
    };

    fetchBook();

  }, [id]);

  /* ================= LOADING ================= */

  if (!book) {

    return (
      <h1
        style={{
          color: darkMode
            ? "white"
            : "black",

          padding: "20px",

          textAlign: "center"
        }}
      >
        Loading...
      </h1>
    );
  }

  /* ================= ADD TO CART ================= */

  const handleAddToCart = () => {

    setCart((prev) => [

      ...prev,

      {
        ...book,
        quantity: 1
      }
    ]);

    toast.success(
      "Added to Cart 🛒"
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        background: darkMode
          ? "linear-gradient(135deg,#0b1220,#111827)"
          : "#f5f5f5",

        padding:
          window.innerWidth < 768
            ? "20px"
            : "40px",

        transition: "0.3s"
      }}
    >

      <div
        style={{
          maxWidth: "1100px",

          margin: "auto",

          background: darkMode
            ? "#111827"
            : "white",

          borderRadius: "22px",

          padding:
            window.innerWidth < 768
              ? "20px"
              : "35px",

          border: darkMode
            ? "1px solid rgba(147,51,234,0.3)"
            : "1px solid #e5e7eb",

          boxShadow: darkMode
            ? "0 0 25px rgba(147,51,234,0.15)"
            : "0 8px 20px rgba(0,0,0,0.15)",

          display: "flex",

          gap: "40px",

          flexWrap: "wrap"
        }}
      >

        {/* ================= IMAGE ================= */}

        <div
          style={{
            flex: 1,
            textAlign: "center"
          }}
        >

          <img
            src={book.image}
            alt={book.title}

            style={{
              width: "100%",

              maxWidth: "350px",

              borderRadius: "18px",

              objectFit: "cover",

              boxShadow: darkMode
                ? "0 0 20px rgba(147,51,234,0.2)"
                : "0 6px 16px rgba(0,0,0,0.15)"
            }}
          />

        </div>

        {/* ================= DETAILS ================= */}

        <div
          style={{
            flex: 1,
            minWidth: "280px"
          }}
        >

          {/* TITLE */}

          <h1
            style={{
              color: darkMode
                ? "#ffffff"
                : "#111827",

              marginBottom: "15px",

              fontSize:
                window.innerWidth < 768
                  ? "28px"
                  : "34px"
            }}
          >
            {book.title}
          </h1>

          {/* PRICE */}

          <h2
            style={{
              color: "#22c55e",
              marginBottom: "15px"
            }}
          >
            ₹{book.price}
          </h2>

          {/* AUTHOR */}

          <p
            style={{
              color: darkMode
                ? "#d1d5db"
                : "#4b5563",

              marginBottom: "10px",

              fontSize: "17px"
            }}
          >
            👤 Author: {book.author}
          </p>

          {/* RATING */}

          <p
            style={{
              color: "#facc15",

              marginBottom: "20px",

              fontSize: "18px"
            }}
          >
            ⭐ {book.rating}
          </p>

          {/* CATEGORY */}

          <p
            style={{
              color: darkMode
                ? "#d1d5db"
                : "#4b5563",

              marginBottom: "10px"
            }}
          >
            📚 Category:
            {" "}
            {book.category}
          </p>

          {/* LANGUAGE */}

          <p
            style={{
              color: darkMode
                ? "#d1d5db"
                : "#4b5563",

              marginBottom: "25px"
            }}
          >
            🌎 Language:
            {" "}
            {book.language}
          </p>

          {/* ================= BUTTON ================= */}

          <button
            onClick={handleAddToCart}

            style={{
              marginBottom: "30px",

              padding: "12px 24px",

              background:
                "linear-gradient(90deg,#6a11cb,#2575fc)",

              color: "white",

              border: "none",

              borderRadius: "12px",

              cursor: "pointer",

              fontSize: "16px",

              fontWeight: "600",

              boxShadow:
                "0 4px 14px rgba(106,17,203,0.3)"
            }}
          >
            🛒 Add to Cart
          </button>

          {/* ================= TABS ================= */}

          <div
            style={{
              display: "flex",

              gap: "15px",

              marginBottom: "25px",

              flexWrap: "wrap"
            }}
          >

            <button
              onClick={() => {

                setActiveTab("book");

                setExpanded(false);
              }}

              style={tabStyle(
                activeTab === "book",
                darkMode
              )}
            >
              📖 The Book
            </button>

            <button
              onClick={() => {

                setActiveTab("author");

                setExpanded(false);
              }}

              style={tabStyle(
                activeTab === "author",
                darkMode
              )}
            >
              ✍️ The Author
            </button>

            <button
              onClick={() => {

                setActiveTab(
                  "contents"
                );

                setExpanded(false);
              }}

              style={tabStyle(
                activeTab === "contents",
                darkMode
              )}
            >
              📑 Table of Contents
            </button>

          </div>

          {/* ================= TAB CONTENT ================= */}

          <div
            style={{
              background: darkMode
                ? "#0f172a"
                : "#f8fafc",

              padding: "22px",

              borderRadius: "16px",

              border: darkMode
                ? "1px solid rgba(147,51,234,0.25)"
                : "1px solid #e5e7eb"
            }}
          >

            {/* BOOK */}

            {activeTab === "book" && (

              <div>

                <h3
                  style={{
                    marginBottom: "15px",

                    color: darkMode
                      ? "#ffffff"
                      : "#111827"
                  }}
                >
                  📖 About The Book
                </h3>

                <p
                  style={textStyle(
                    darkMode
                  )}
                >

                  {expanded

                    ? `${book.title} is an excellent book designed for students who want to strengthen their understanding in ${book.category}. This book provides clear explanations, practical examples, exercises, and modern learning techniques for better understanding. It also contains revision materials, solved examples, concept-building chapters, and advanced problem-solving methods.`

                    : `${book.title} is an excellent book designed for students who want to strengthen their understanding in ${book.category}. This book provides clear explanations and practical examples for better learning...`
                  }

                </p>

              </div>
            )}

            {/* AUTHOR */}

            {activeTab === "author" && (

              <div>

                <h3
                  style={{
                    marginBottom: "15px",

                    color: darkMode
                      ? "#ffffff"
                      : "#111827"
                  }}
                >
                  ✍️ About The Author
                </h3>

                <p
                  style={textStyle(
                    darkMode
                  )}
                >

                  {expanded

                    ? `${book.author} is a well-known author in the field of ${book.category}. Their books are popular for easy-to-understand explanations and student-friendly concepts.`

                    : `${book.author} is a well-known author in the field of ${book.category}. Their books are popular for easy-to-understand explanations and student-friendly concepts...`
                  }

                </p>

              </div>
            )}

            {/* CONTENTS */}

            {activeTab === "contents" && (

              <div>

                <h3
                  style={{
                    marginBottom: "15px",

                    color: darkMode
                      ? "#ffffff"
                      : "#111827"
                  }}
                >
                  📑 Table of Contents
                </h3>

                <ul
                  style={{
                    lineHeight: "2",

                    color: darkMode
                      ? "#d1d5db"
                      : "#374151",

                    paddingLeft: "20px"
                  }}
                >

                  <li>
                    Introduction
                  </li>

                  <li>
                    Core Concepts
                  </li>

                  <li>
                    Problem Solving Techniques
                  </li>

                  {expanded && (
                    <>

                      <li>
                        Practice Exercises
                      </li>

                      <li>
                        Advanced Topics
                      </li>

                      <li>
                        Summary & Revision
                      </li>

                    </>
                  )}

                </ul>

              </div>
            )}

            {/* ================= READ MORE ================= */}

            <button
              onClick={() =>
                setExpanded(
                  !expanded
                )
              }

              style={{
                marginTop: "12px",

                background:
                  "transparent",

                border: "none",

                fontSize: "13px",

                color: darkMode
                  ? "#c084fc"
                  : "#7c3aed",

                cursor: "pointer",

                fontWeight: "500",

                padding: 0,

                transition: "0.3s"
              }}
            >

              {expanded
                ? "Read Less ▲"
                : "Read More ▼"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

/* ================= TEXT STYLE ================= */

const textStyle = (darkMode) => ({

  lineHeight: "1.8",

  color: darkMode
    ? "#d1d5db"
    : "#374151"

});

/* ================= TAB STYLE ================= */

const tabStyle = (
  active,
  darkMode
) => ({

  padding: "10px 18px",

  borderRadius: "10px",

  border: "none",

  cursor: "pointer",

  fontWeight: "600",

  background: active

    ? "linear-gradient(90deg,#6a11cb,#2575fc)"

    : darkMode

    ? "#1f2937"

    : "#e5e7eb",

  color: active

    ? "white"

    : darkMode

    ? "#e5e7eb"

    : "#111827",

  transition: "0.3s"

});

export default BookDetails;