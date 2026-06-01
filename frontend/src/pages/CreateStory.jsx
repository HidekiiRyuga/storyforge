import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function CreateStory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await API.post("/story", { title, description });
      navigate("/dashboard");
    } catch {
      alert("Failed to create story");
    }
  };

  return (
    <div className="archive-page archive-page--narrow">
      <header className="edit-header">
        <div>
          <p className="archive-eyebrow">New manuscript</p>
          <h1 className="archive-section-title">Begin a story</h1>
          <p className="archive-copy">
            Give the archive a title and a promise of the adventure waiting
            inside.
          </p>
        </div>
      </header>

      <div className="archive-card chapter-editor-card">
        <div className="archive-form">
          <div className="archive-field">
            <label htmlFor="story-title">Story title</label>
            <input
              id="story-title"
              className="archive-input"
              placeholder="The Lantern Under Briar Hill"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="archive-field">
            <label htmlFor="story-description">Short description</label>
            <textarea
              id="story-description"
              className="archive-textarea"
              placeholder="A glimpse of the mystery, journey, or world readers will enter."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="archive-actions">
            <button
              onClick={handleCreate}
              className="archive-button archive-button--primary"
            >
              Publish Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateStory;
