import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>StoryForge</Link>
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/stories" style={styles.link}>Read</Link>

        {isAuthenticated && (
          <Link to="/create" style={styles.link}>Write</Link>
        )}

        {!isAuthenticated ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}


const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 32px",
    background: "#0f0f0f",
    borderBottom: "1px solid #222",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  button: {
    background: "transparent",
    border: "1px solid #555",
    color: "#fff",
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default Navbar;
