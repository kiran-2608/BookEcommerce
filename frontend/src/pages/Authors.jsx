import { useState, useEffect } from "react";
import axios from "axios";

function Authors({ darkMode }) {
  const [books, setBooks] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [search, setSearch] = useState("");

  const isMobile = window.innerWidth <= 768;

  // FETCH BOOKS
  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/books"
      );

      setBooks(res.data.books || []);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchBooks();

    const interval = setInterval(() => {
      fetchBooks();
    }, 2000);

    return () => clearInterval(interval);

  }, []);

  // NORMALIZE AUTHOR
  const normalizeAuthor = (author) => {
    return author
      ?.trim()
      ?.replace(/\./g, "")
      ?.replace(/\s+/g, "")
      ?.toLowerCase();
  };

  // UNIQUE AUTHORS
  const authors = [
    ...new Map(
      books
        .filter(
          (book) =>
            book.author &&
            book.author.trim() !== ""
        )
        .map((book) => [
          normalizeAuthor(book.author),
          book.author.trim()
        ])
    ).values()
  ];

  // SEARCH
  const filteredAuthors =
    authors.filter((author) =>
      author
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // SELECTED AUTHOR BOOKS
  const authorBooks =
    books.filter(
      (book) =>
        normalizeAuthor(
          book.author
        ) ===
        normalizeAuthor(
          selectedAuthor
        )
    );

  return (
    <div
      style={{
        padding: isMobile ? "15px" : "20px",
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
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        ✍️ Authors
      </h1>

      {/* SEARCH */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px"
        }}
      >
        <input
          type="text"
          placeholder="Search author..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: isMobile
              ? "100%"
              : "400px",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: darkMode
              ? "#1f2937"
              : "white",
            color: darkMode
              ? "white"
              : "black"
          }}
        />
      </div>

      {/* AUTHORS GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            isMobile
              ? "1fr"
              : "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}
      >
        {filteredAuthors.map(
          (author, index) => {

            const count =
              books.filter(
                (book) =>
                  normalizeAuthor(
                    book.author
                  ) ===
                  normalizeAuthor(
                    author
                  )
              ).length;

            return (
              <div
                key={index}
                onClick={() =>
                  setSelectedAuthor(author)
                }

                style={{
                  background:
                    selectedAuthor === author
                      ? "#9150d6"
                      : darkMode
                      ? "#1f2937"
                      : "white",

                  color:
                    selectedAuthor === author
                      ? "white"
                      : darkMode
                      ? "white"
                      : "#111",

                  padding: "20px",
                  borderRadius: "15px",
                  textAlign: "center",
                  cursor: "pointer",

                  transition:
                    "all .3s ease",

                  boxShadow:
                    "0 4px 12px rgba(0,0,0,.1)"
                }}

                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.03)";

                  e.currentTarget.style.boxShadow =
                    "0 12px 20px rgba(0,0,0,.2)";
                }}

                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px) scale(1)";

                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,.1)";
                }}
              >
                <h3>
                  👤 {author}
                </h3>

                <p>
                  {count} Books
                </p>

              </div>
            );

          }
        )}
      </div>

      {/* AUTHOR BOOKS */}

      {selectedAuthor && (
        <>
          <h2
            style={{
              color: darkMode
                ? "white"
                : "#111",
              marginBottom: "25px"
            }}
          >
            📚 Books by {selectedAuthor}
            ({authorBooks.length})
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                isMobile
                  ? "1fr"
                  : "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px"
            }}
          >
            {authorBooks.map(
              (book) => (

                <div
                  key={book._id}

                  style={{
                    background:
                      darkMode
                        ? "#1f2937"
                        : "white",

                    padding: "20px",
                    borderRadius: "18px",

                    transition:
                      "all .3s ease",

                    boxShadow:
                      "0 4px 12px rgba(0,0,0,.08)"
                  }}

                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px)";

                    e.currentTarget.style.boxShadow =
                      "0 12px 20px rgba(0,0,0,.2)";
                  }}

                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0px)";

                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,.08)";
                  }}
                >

                  <img
                    src={book.image}
                    alt={book.title}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "contain",
                      marginBottom: "15px"
                    }}
                  />

                  <h3
                    style={{
                      color:
                        darkMode
                          ? "white"
                          : "#111"
                    }}
                  >
                    {book.title}
                  </h3>

                  <p
                    style={{
                      color: "#27ae60",
                      fontWeight: "bold"
                    }}
                  >
                    ₹{book.price}
                  </p>

                  <p
                    style={{
                      color: "#f39c12"
                    }}
                  >
                    ⭐ {book.rating}
                  </p>

                </div>

              )
            )}
          </div>
        </>
      )}

    </div>
  );
}

export default Authors;