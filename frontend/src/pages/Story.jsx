import { useEffect, useState } from "react";
import API from "../api";

function Story() {
  const [story, setStory] = useState(null);
  const [readChapters, setReadChapters] = useState([]);
  const [artifacts, setArtifacts] = useState([]);

  const fetchStory = async () => {
    const res = await API.get("/story");
    setStory(res.data.story);
    setReadChapters(res.data.readChapters);
    setArtifacts(res.data.artifacts);
  };

  const markRead = async (chapterNumber) => {
    await API.post("/progress/read", { chapterNumber });
    fetchStory();
  };

  useEffect(() => {
    fetchStory();
  }, []);

  if (!story) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>{story.title}</h1>
      <p>{story.description}</p>

      <h2>Chapters</h2>
      {story.chapters.map((ch) => (
        <div key={ch.chapterNumber} style={{ marginBottom: 20 }}>
          <p>{ch.content}</p>
          {!readChapters.includes(ch.chapterNumber) && (
            <button onClick={() => markRead(ch.chapterNumber)}>
              Mark as Read
            </button>
          )}
        </div>
      ))}

      <h2>Artifacts</h2>
      {artifacts.length === 0 && <p>No artifacts unlocked yet.</p>}
      {artifacts.map((a) => (
        <div key={a._id} style={{ border: "1px solid #555", padding: 10 }}>
          <strong>{a.title}</strong>
          <p>{a.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Story;
