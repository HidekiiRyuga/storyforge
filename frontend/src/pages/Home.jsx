import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

    
function Home() {
  const { isAuthenticated } = useAuth();


  return (

   
    <div style={styles.container}>
      <h1 style={styles.title}>Stories That Unlock Themselves</h1>

      <p style={styles.subtitle}>
        Read immersive stories. Discover hidden artifacts.
        Write worlds others can explore.
      </p>

      <div style={styles.buttons}>
        <Link to="/stories" style={styles.primaryBtn}>
          Read Stories 
        </Link>

        {isAuthenticated ? (
          <Link to="/create" style={styles.secondaryBtn}>
            Write a Story
          </Link>
        ) : (
          <Link to="/register" style={styles.secondaryBtn}>
            Start Writing 
          </Link>
         
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "80px 40px",
    textAlign: "center",
    backgroundColor: "#0f0f0f",
    minHeight: "80vh",
  },
  title: {
    fontSize: "42px",
    marginBottom: "20px",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: "18px",
    color: "#aaa",
    marginBottom: "40px",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  primaryBtn: {
    padding: "12px 24px",
    background: "#ffffff",
    color: "#000000",
    textDecoration: "none",
    fontWeight: "bold",
    borderRadius: "4px",
  },
  secondaryBtn: {
    padding: "12px 24px",
    background: "transparent",
    border: "1px solid #ffffff",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "4px",
  },
};

export default Home;
