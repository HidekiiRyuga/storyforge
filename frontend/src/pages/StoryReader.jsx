import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

function StoryReader() {
  const { id } = useParams(); // story ID from URL
  const [story, setStory] = useState(null);
  const [readChapters, setReadChapters] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStory = async () => {
    try {
      const res = await API.get(`/story/${id}`); //  CORRECT ENDPOINT
      setStory(res.data.story);
      setReadChapters(res.data.readChapters);
      setArtifacts(res.data.artifacts);
    } catch (err) {
      console.error("Failed to load story", err);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (chapterNumber) => {
    await API.post("/progress/read", { chapterNumber });
    fetchStory();
  };

  useEffect(() => {
    fetchStory();
  }, [id]);

  if (loading) {
    return <p style={{ padding: 40 }}>Loading story…</p>;
  }

  if (!story) {
    return <p style={{ padding: 40 }}>Story not found.</p>;
  }

  return (
    <div style={styles.container}>
      <h1>{story.title}</h1>
      <p style={styles.desc}>{story.description}</p>

      {story.chapters.map((ch) => (
  <div key={ch.chapterNumber} style={styles.chapter}>
    
    {/*  SHOW CHAPTER NUMBER + TITLE */}
    <h3>
      Chapter {ch.chapterNumber}: {ch.title}
    </h3>

    <p>{ch.content}</p>

        {readChapters.includes(ch.chapterNumber) &&
      ch.artifacts &&
      ch.artifacts.map((artifact, index) => (
        <div key={index} style={styles.artifact}>
          <strong>🔓 {artifact.title}</strong>
          <p>{artifact.content}</p>
        </div>
      ))
    }

    {!readChapters.includes(ch.chapterNumber) && (
      <button onClick={() => markRead(ch.chapterNumber)}>
        Continue
      </button>
    )}
    
  </div>
))}

      <h3>Artifacts</h3>
      {artifacts.length === 0 && <p>No artifacts yet.</p>}
      {artifacts.map((a) => (
        <div key={a._id} style={styles.artifact}>
          <strong>{a.title}</strong>
          <p>{a.content}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "60px",
    maxWidth: "700px",
    margin: "auto",
  },
  desc: {
    color: "#aaa",
    marginBottom: "40px",
  },
  chapter: {
    marginBottom: "30px",
  },
  /*artifact: {
    border: "1px dashed #555",
    padding: "15px",
    marginBottom: "10px",
  },*/
  artifact: {
  border: "1px dashed #555",
  padding: "10px",
  marginTop: "10px",
  background: "#111",
},
};

export default StoryReader;
