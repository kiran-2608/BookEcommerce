import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";

function Home({
  wishlist,
  setWishlist,
  cart,
  setCart,
  darkMode
}) {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const isMobile = window.innerWidth < 768;

  /* ================= BANNERS ================= */

  const banners = [
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
  ];

  /* ================= FETCH BOOKS ================= */

  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/books"
        );

        setBooks(res.data.books);

      } catch (error) {

        console.log(
          "❌ Error fetching books:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

    fetchBooks();

  }, []);

  /* ================= BANNER AUTO SLIDE ================= */

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((prev) =>
        (prev + 1) % banners.length
      );

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  /* ================= CATEGORIES ================= */

  const categories = [
    "All",
    ...Array.from(
      new Set(
        books
          .map((b) =>
            b.category?.trim().toLowerCase()
          )
          .filter(
            (cat) =>
              cat && cat !== "all"
          )
      )
    )
  ].map((cat) =>
    cat === "All"
      ? "All"
      : cat.charAt(0).toUpperCase() +
        cat.slice(1)
  );

  /* ================= FILTER BOOKS ================= */

  const filteredBooks = books.filter((book) => {

    const searchText =
      search.toLowerCase();

    const matchesSearch =

      book.title
        ?.toLowerCase()
        .includes(searchText) ||

      book.author
        ?.toLowerCase()
        .includes(searchText) ||

      book.category
        ?.toLowerCase()
        .includes(searchText);

    const matchesCategory =

      category === "All" ||

      book.category
        ?.toLowerCase() ===
      category.toLowerCase();

    return (
      matchesSearch &&
      matchesCategory
    );

  });

  return (

    <div
      style={{
        padding: "20px",
        background: darkMode
          ? "#111827"
          : "#f5f5f5",
        minHeight: "100vh",
        transition: "0.3s"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          flexDirection:
            isMobile
              ? "column"
              : "row",
          alignItems:
            isMobile
              ? "stretch"
              : "center",
          gap: "14px",
          marginBottom: "25px"
        }}
      >

        <h1
          style={{
            color: darkMode
              ? "white"
              : "#111827",
            margin: 0,
            fontSize:
              isMobile
                ? "28px"
                : "24px",
            textAlign:
              isMobile
                ? "center"
                : "left",
            width:
              isMobile
                ? "100%"
                : "auto"
          }}
        >
          📚 Book Store
        </h1>

        <input
          type="text"
          placeholder="Search by title, author, or subject..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            flex: 1,
            width:
              isMobile
                ? "100%"
                : "auto",
            minWidth:
              isMobile
                ? "100%"
                : "250px",
            maxWidth:
              isMobile
                ? "100%"
                : "900px",
            padding: "15px 18px",
            fontSize: "15px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            background: darkMode
              ? "#1f2937"
              : "white",
            color: darkMode
              ? "white"
              : "black",
            outline: "none",
            boxSizing: "border-box"
          }}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          style={{
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            background: darkMode
              ? "#1f2937"
              : "white",
            color: darkMode
              ? "white"
              : "black",
            width:
              isMobile
                ? "100%"
                : "150px",
            cursor: "pointer"
          }}
        >

          {categories.map(
            (cat, index) => (

              <option
                key={index}
              >
                {cat}
              </option>

            )
          )}

        </select>

      </div>

      {/* BANNER */}

      <div
        style={{
          marginTop: "10px",
          marginBottom: "20px",
          borderRadius: "12px",
          overflow: "hidden"
        }}
      >

        <img
          src={banners[currentSlide]}
          alt="Banner"
          style={{
            width: "100%",
            height:
              isMobile
                ? "180px"
                : "400px",
            objectFit: "cover"
          }}
        />

      </div>

      {/* BOOKS */}

      {loading ? (

        <h2
          style={{
            textAlign: "center"
          }}
        >
          Loading Books...
        </h2>

      ) : (

        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: "20px"
            }}
          >

            {filteredBooks.map(
              (book) => (

                <BookCard
                  key={book._id}
                  book={book}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  cart={cart}
                  setCart={setCart}
                />

              )
            )}

          </div>

          {filteredBooks.length === 0 && (

            <h2
              style={{
                textAlign: "center"
              }}
            >
              No Books Found 📚
            </h2>

          )}

        </>

      )}

    </div>
  );
}

export default Home;