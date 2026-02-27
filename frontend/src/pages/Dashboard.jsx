import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchMyStories = async () => {
      const res = await API.get("/story/author/me");
      setStories(res.data);
    };

    fetchMyStories();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Your Stories</h2>

      <Link to="/create" style={styles.createBtn}>
        + Create New Story
      </Link>

      {stories.length === 0 ? (
        <p>You haven’t written any stories yet.</p>
      ) : (
      <ul>
  {stories.map((story) => (
    <li key={story._id} style={styles.storyItem}>
      <strong>{story.title}</strong>
      <p>{story.description}</p>

      <Link to={`/edit/${story._id}`} style={styles.editBtn}>
        Edit Story
      </Link>
    </li>
  ))}
</ul>


      )}
    </div>
  );
}

const styles = {
  createBtn: {
    display: "inline-block",
  marginBottom: "20px",
  padding: "10px 16px",
  background: "#111",
  color: "#fff",
  border: "1px solid #333",
  textDecoration: "none",
  },
  storyItem: {
    marginBottom: "15px",
    borderBottom: "1px solid #333",
    paddingBottom: "10px",
  },
  editBtn: {
  display: "inline-block",
  marginTop: "8px",
  padding: "6px 12px",
  background: "#111",
  color: "#fff",
  border: "1px solid #333",
  textDecoration: "none",
}

};

export default Dashboard;
