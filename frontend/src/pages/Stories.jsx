import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await API.get("/story");
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
    return (
      <div className="archive-page">
        <div className="archive-loading">Gathering stories from the stacks...</div>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="archive-page">
        <div className="archive-empty">
          No stories are available yet. The archive is quiet, but not for long.
        </div>
      </div>
    );
  }

  return (
    <div className="archive-page">
      <header className="stories-header">
        <div>
          <p className="archive-eyebrow">Reading room</p>
          <h1 className="archive-section-title">Tales in the archive</h1>
          <p className="archive-copy">
            Explore stories left by other travelers, writers, and keepers of
            curious worlds.
          </p>
        </div>
      </header>

      <div className="archive-grid">
        {stories.map((story) => (
          <article key={story._id} className="story-card archive-card">
            <div>
              <div className="story-card__mark">✦</div>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
            </div>

            <Link to={`/stories/${story._id}`} className="archive-button">
              Open Tale
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Stories;
