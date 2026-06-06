import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({
  cartCount,
  wishlistCount,
  darkMode,
  setDarkMode
}) => {

  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ NEW
  const [profileOpen, setProfileOpen] = useState(false);

  const {
    user,
    logout,
    loading
  } = useAuth();

  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768
  );

  // RESPONSIVE
  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);

  }, []);

  // COMMON LINK STYLE
  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
    transition: "0.3s"
  };

  // ACTIVE STYLE
  const navStyle = ({ isActive }) => ({
    ...linkStyle,
    color: isActive ? "#ffd700" : "#ffffff",
    borderBottom: isActive ? "2px solid #ffd700" : "none",
    paddingBottom: "4px"
  });

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #6a11cb, #2575fc)",
        color: "white",
        padding: "14px 24px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 4px 14px rgba(0,0,0,0.2)"
      }}
    >
      {/* TOP NAVBAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {/* LOGO */}
        <h2
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: "25px",
            fontWeight: "700"
          }}
        >
          📚 Book Store
        </h2>

        {/* RIGHT SECTION */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px"
          }}
        >

          {/* USER PROFILE */}
          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <div
              style={{
                position: "relative"
              }}
            >

              {/* PROFILE ICON */}
              <div
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "#ffffff",
                  color: "#6a11cb",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
                }}
                title={user.name}
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* PROFILE POPUP */}
              {profileOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: 0,
                    background: "#ffffff",
                    color: "#111827",
                    padding: "14px",
                    borderRadius: "14px",
                    minWidth: "220px",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,0.2)",
                    zIndex: 999
                  }}
                >

                  {/* TOP PROFILE */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "14px"
                    }}
                  >

                    <div
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(90deg,#6a11cb,#2575fc)",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "18px"
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#6b7280"
                        }}
                      >
                        Logged in as
                      </div>

                      <div
                        style={{
                          fontWeight: "bold",
                          color: "#111827"
                        }}
                      >
                        {user.name}
                      </div>
                    </div>

                  </div>

                  {/* EMAIL */}
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#4b5563",
                      marginBottom: "14px",
                      wordBreak: "break-word"
                    }}
                  >
                    {user.email}
                  </div>

                  {/* DASHBOARD BUTTON */}
                  <Link
                    to="/dashboard"
                    onClick={() =>
                      setProfileOpen(false)
                    }
                    style={{
                      display: "block",
                      textDecoration: "none",
                      background:
                        "linear-gradient(90deg,#6a11cb,#2575fc)",
                      color: "white",
                      padding: "10px",
                      borderRadius: "10px",
                      textAlign: "center",
                      fontWeight: "600",
                      marginBottom: "10px"
                    }}
                  >
                    Dashboard
                  </Link>

                  {/* LOGOUT */}
                  <button
                    onClick={logout}
                    style={{
                      width: "100%",
                      background: "#fbbf24",
                      color: "#111827",
                      border: "none",
                      padding: "10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          ) : null}

          {/* DESKTOP MENU */}
          {!isMobile && (
            <div
              style={{
                display: "flex",
                gap: "22px",
                alignItems: "center"
              }}
            >
              <NavLink to="/" style={navStyle}>
                Home
              </NavLink>

              <NavLink to="/catalog" style={navStyle}>
                Catalog
              </NavLink>

              <NavLink to="/authors" style={navStyle}>
                Authors
              </NavLink>

              <NavLink to="/events" style={navStyle}>
                Events
              </NavLink>

              <NavLink to="/contact" style={navStyle}>
                Contact
              </NavLink>

              {/* LOGIN / REGISTER */}
              {loading ? null : !user ? (
                <>
                  <NavLink to="/login" style={navStyle}>
                    Login
                  </NavLink>

                  <NavLink to="/register" style={navStyle}>
                    Register
                  </NavLink>
                </>
              ) : null}

              {/* WISHLIST */}
              <Link
                to="/wishlist"
                style={{
                  ...linkStyle,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                💖 <span>({wishlistCount})</span>
              </Link>

              {/* CART */}
              <Link
                to="/cart"
                style={{
                  ...linkStyle,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                🛒 <span>({cartCount})</span>
              </Link>
            </div>
          )}

          {/* DARK MODE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              background: darkMode ? "#374151" : "white",
              color: darkMode ? "white" : "black"
            }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* MOBILE MENU */}
          {isMobile && (
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                fontSize: "28px",
                cursor: "pointer"
              }}
            >
              ☰
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && isMobile && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "18px",
            background: "rgba(255,255,255,0.15)",
            padding: "18px",
            borderRadius: "14px",
            backdropFilter: "blur(10px)"
          }}
        >
          <NavLink
            to="/"
            style={navStyle}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/catalog"
            style={navStyle}
            onClick={() => setMenuOpen(false)}
          >
            Catalog
          </NavLink>

          <NavLink
            to="/authors"
            style={navStyle}
            onClick={() => setMenuOpen(false)}
          >
            Authors
          </NavLink>

          <NavLink
            to="/events"
            style={navStyle}
            onClick={() => setMenuOpen(false)}
          >
            Events
          </NavLink>

          <NavLink
            to="/contact"
            style={navStyle}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>

          {/* MOBILE LOGIN */}
          {loading ? null : !user ? (
            <>
              <NavLink
                to="/login"
                style={navStyle}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                style={navStyle}
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          ) : null}

          <Link
            to="/wishlist"
            style={linkStyle}
            onClick={() => setMenuOpen(false)}
          >
            💖 Wishlist ({wishlistCount})
          </Link>

          <Link
            to="/cart"
            style={linkStyle}
            onClick={() => setMenuOpen(false)}
          >
            🛒 Cart ({cartCount})
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;