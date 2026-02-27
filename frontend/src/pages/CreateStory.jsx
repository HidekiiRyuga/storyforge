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
    } catch (err) {
      alert("Failed to create story");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Create New Story</h2>

      <input
        placeholder="Story title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Short description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <button onClick={handleCreate}>Publish Story</button>
    </div>
  );
}

export default CreateStory;
