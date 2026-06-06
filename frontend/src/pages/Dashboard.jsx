import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user, logout, loading } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);

    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.center}>
        <h2>No user found</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.container,
          flexDirection: isMobile ? "column" : "row"
        }}
      >

        {/* PROFILE (TOP ON MOBILE) */}
        <div style={styles.profileCard}>
          <div style={styles.avatar}>
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <h1 style={styles.name}>{user.name}</h1>
          <p style={styles.email}>{user.email}</p>

          <div style={styles.activeBadge}>● Active User</div>

          <button style={styles.settingBtn}>Change Password</button>

          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>

        {/* RIGHT SECTION (STACKED BELOW ON MOBILE) */}
        <div style={styles.rightSection}>

          {/* WELCOME */}
          <div style={styles.welcomeCard}>
            <h2>Welcome Back 👋</h2>
            <p>Manage your books, wishlist, orders and account.</p>
          </div>

          {/* STATS */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <h3>💖 Wishlist</h3>
              <p style={styles.statNumber}>{wishlist.length}</p>
            </div>

            <div style={styles.statCard}>
              <h3>🛒 Cart</h3>
              <p style={styles.statNumber}>{cart.length}</p>
            </div>

            <div style={styles.statCard}>
              <h3>📦 Orders</h3>
              <p style={styles.statNumber}>{orders.length}</p>
            </div>
          </div>

          {/* PROFILE INFO */}
          <div style={styles.detailsCard}>
            <h3>👤 Profile Information</h3>

            <div style={styles.detailRow}>
              <span>Name</span>
              <span>{user.name}</span>
            </div>

            <div style={styles.detailRow}>
              <span>Email</span>
              <span>{user.email}</span>
            </div>

            <div style={styles.detailRow}>
              <span>User ID</span>
              <span style={{ fontSize: "12px" }}>{user._id}</span>
            </div>
          </div>

          {/* WISHLIST */}
          <div style={styles.detailsCard}>
            <h3>💖 Wishlist Books</h3>

            {wishlist.length === 0 ? (
              <p>No wishlist books</p>
            ) : (
              wishlist.map((book) => (
                <div key={book._id} style={styles.bookRow}>
                  <span>{book.title}</span>
                  <span>₹{book.price}</span>
                </div>
              ))
            )}
          </div>

          {/* CART */}
          <div style={styles.detailsCard}>
            <h3>🛒 Cart Items</h3>

            {cart.length === 0 ? (
              <p>No cart items</p>
            ) : (
              cart.map((book) => (
                <div key={book._id} style={styles.bookRow}>
                  <span>{book.title}</span>
                  <span>Qty: {book.quantity}</span>
                </div>
              ))
            )}
          </div>

          {/* ORDERS */}
          <div style={styles.detailsCard}>
            <h3>📦 Orders</h3>

            {orders.length === 0 ? (
              <p>No orders yet</p>
            ) : (
              orders.map((order, i) => (
                <div key={i} style={styles.orderCard}>
                  <p>📚 {order.title}</p>
                  <p>💳 Paid</p>
                  <p>🚚 Processing</p>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#111827,#1f2937)",
    padding: "15px",
    color: "white"
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    gap: "15px"
  },

  profileCard: {
    flex: "1",
    background: "#1f2937",
    borderRadius: "18px",
    padding: "20px",
    textAlign: "center"
  },

  avatar: {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    margin: "0 auto",
    background: "linear-gradient(90deg,#6a11cb,#2575fc)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px"
  },

  name: { fontSize: "20px" },
  email: { color: "#d1d5db", fontSize: "14px" },

  activeBadge: {
    background: "#22c55e",
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "11px",
    display: "inline-block",
    marginTop: "10px"
  },

  rightSection: {
    flex: "3",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  welcomeCard: {
    background: "linear-gradient(90deg,#6a11cb,#2575fc)",
    padding: "18px",
    borderRadius: "16px"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(100px,1fr))",
    gap: "10px"
  },

  statCard: {
    background: "#1f2937",
    padding: "12px",
    borderRadius: "12px",
    textAlign: "center"
  },

  statNumber: {
    fontSize: "24px",
    color: "#60a5fa"
  },

  detailsCard: {
    background: "#1f2937",
    padding: "18px",
    borderRadius: "16px"
  },

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #374151"
  },

  bookRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0"
  },

  orderCard: {
    background: "#111827",
    padding: "12px",
    borderRadius: "10px",
    marginTop: "8px"
  },

  settingBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px"
  },

  logoutBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    background: "#f59e0b",
    borderRadius: "10px",
    border: "none"
  }
};

export default Dashboard;