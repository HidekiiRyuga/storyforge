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
    <div className="archive-page">
      <header className="dashboard-header">
        <div>
          <p className="archive-eyebrow">Author desk</p>
          <h1 className="archive-section-title">Your written worlds</h1>
          <p className="archive-copy">
            Return to the stories you are shaping, add new chapters, and tuck
            artifacts where curious readers will find them.
          </p>
        </div>

        <Link to="/create" className="archive-button archive-button--primary">
          Create New Story
        </Link>
      </header>

      {stories.length === 0 ? (
        <div className="archive-empty">
          You have not written any stories yet. The archive has a fresh shelf
          waiting for your first adventure.
        </div>
      ) : (
        <ul className="dashboard-list">
          {stories.map((story) => (
            <li key={story._id} className="dashboard-story archive-card">
              <strong>{story.title}</strong>
              <p className="archive-copy">{story.description}</p>

              <Link to={`/edit/${story._id}`} className="archive-button">
                Edit Story
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
