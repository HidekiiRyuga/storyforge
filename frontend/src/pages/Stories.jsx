import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await API.get("/story"); // now returns ARRAY
        setStories(res.data);
      } catch (err) {
        console.error("Failed to load stories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return <p style={{ padding: 40 }}>Loading stories…</p>;
  }

  if (stories.length === 0) {
    return <p style={{ padding: 40 }}>No stories available.</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Stories</h2>

      <div style={styles.grid}>
        {stories.map((story) => (
          <div key={story._id} style={styles.card}>
            <h3>{story.title}</h3>
            <p>{story.description}</p>

            <Link to={`/stories/${story._id}`} style={styles.readBtn}>
              Read
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    minHeight: "80vh",
    backgroundColor: "#0f0f0f", // dark background
    color: "#ffffff",           // white text
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },

  card: {
    padding: "20px",
    border: "1px solid #333",
    background: "#111",
  },

  readBtn: {
    display: "inline-block",
    marginTop: "10px",
    color: "#fff",
    border: "1px solid #555",
    padding: "6px 12px",
    textDecoration: "none",
  },
};


export default Stories;
