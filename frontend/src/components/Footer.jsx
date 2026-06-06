const Footer = ({ darkMode }) => {
  return (
    <footer
      style={{
        background: darkMode ? "#111827" : "#0f172a",
        color: "white",
        padding: "40px 20px 20px",
        marginTop: "40px"
      }}
    >
      {/* TOP SECTION */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "30px",
          maxWidth: "1200px",
          margin: "auto"
        }}
      >
        {/* BRAND */}
        <div style={{ flex: "1", minWidth: "220px" }}>
          <h2
            style={{
              marginBottom: "10px",
              fontSize: "24px",
              color: "#ffffff"
            }}
          >
            📚 Book Store
          </h2>

          <p
            style={{
              lineHeight: "1.8",
              color: "#e5e7eb",
              fontSize: "15px"
            }}
          >
            Discover amazing books from different
            categories with a modern online shopping
            experience.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div style={{ minWidth: "180px" }}>
          <h3
            style={{
              marginBottom: "12px",
              color: "#ffffff"
            }}
          >
            Quick Links
          </h3>

          <p style={{ color: "#e5e7eb" }}>
            🏠 Home
          </p>

          <p style={{ color: "#e5e7eb" }}>
            📚 Catalog
          </p>

          <p style={{ color: "#e5e7eb" }}>
            💖 Wishlist
          </p>

          <p style={{ color: "#e5e7eb" }}>
            🛒 Cart
          </p>
        </div>

        {/* CONTACT */}
        <div style={{ minWidth: "220px" }}>
          <h3
            style={{
              marginBottom: "12px",
              color: "#ffffff"
            }}
          >
            Contact
          </h3>

          <p style={{ color: "#e5e7eb" }}>
            📍 Hyderbad, Telangana, India
          </p>

          <p style={{ color: "#e5e7eb" }}>
            📧 bookstore@gmail.com
          </p>

          <p style={{ color: "#e5e7eb" }}>
            📞 +91 9849559594
          </p>
        </div>

        {/* SOCIAL MEDIA */}
        <div style={{ minWidth: "220px" }}>
          <h3
            style={{
              marginBottom: "12px",
              color: "#ffffff"
            }}
          >
            Follow Us
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              fontSize: "16px"
            }}
          >
            {/* INSTAGRAM */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                fontWeight: "600",
                color: "#ffffff"
              }}
            >
              <span
                style={{
                  color: "#E1306C",
                  fontSize: "20px"
                }}
              >
                📷
              </span>

              <span style={{ color: "#ffffff" }}>
                Instagram
              </span>
            </div>

            {/* TWITTER/X */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                fontWeight: "600",
                color: "#ffffff"
              }}
            >
              <span
                style={{
                  color: "#1DA1F2",
                  fontSize: "18px"
                }}
              >
                ✕
              </span>

              <span style={{ color: "#ffffff" }}>
                Twitter / X
              </span>
            </div>

            {/* FACEBOOK */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                fontWeight: "600",
                color: "#ffffff"
              }}
            >
              <span
                style={{
                  color: "#1877F2",
                  fontSize: "22px",
                  fontWeight: "bold"
                }}
              >
                f
              </span>

              <span style={{ color: "#ffffff" }}>
                Facebook
              </span>
            </div>

            {/* YOUTUBE */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                fontWeight: "600",
                color: "#ffffff"
              }}
            >
              <span
                style={{
                  color: "#FF0000",
                  fontSize: "18px"
                }}
              >
                ▶
              </span>

              <span style={{ color: "#ffffff" }}>
                YouTube
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          marginTop: "30px",
          paddingTop: "20px",
          textAlign: "center",
          color: "#f3f4f6",
          fontSize: "14px"
        }}
      >
        © 2026 📚 Book Store — Made with ❤️ using React
      </div>
    </footer>
  );
};

export default Footer;