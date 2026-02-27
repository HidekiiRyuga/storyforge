import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api";

function EditStory() {

  const [artifactTitle, setArtifactTitle] = useState("");
  const [artifactContent, setArtifactContent] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(null);
  const { id } = useParams();

  const [story, setStory] = useState(null);
  const [chapterNumber, setChapterNumber] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingChapter, setEditingChapter] = useState(null);
  

  const fetchStory = async () => {
    const res = await API.get(`/story/${id}`);
    setStory(res.data.story);
  };

  useEffect(() => {
    fetchStory();
  }, []);

  const handleSaveChapter = async () => {
  try {
    if (editingChapter) {
      // UPDATE existing chapter
      await API.put(`/story/${id}/chapter/${editingChapter}`, {
        title,
        content,
      });
    } else {
      // ADD new chapter
      await API.post(`/story/${id}/chapter`, {
        chapterNumber,
        title,
        content,
      });
    }

    setChapterNumber("");
    setTitle("");
    setContent("");
    setEditingChapter(null);

    fetchStory();

  } catch {
    alert("Operation failed");
  }
};

  const deleteChapter = async (num) => {
    await API.delete(`/story/${id}/chapter/${num}`);
    fetchStory();
  };

  if (!story) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Edit Story: {story.title}</h2>

      {/* EXISTING CHAPTERS */}
      <h3>Chapters</h3>

      {story.chapters.length === 0 ? (
        <p>No chapters yet.</p>
      ) : (
        story.chapters.map((ch) => (
          <div key={ch.chapterNumber} style={styles.chapter}>
            <strong>Chapter {ch.chapterNumber}: {ch.title}</strong>
            <p>{ch.content}</p>

            <button onClick={() => deleteChapter(ch.chapterNumber)}>
              Delete
            </button>

            <button
  onClick={() => setSelectedChapter(ch.chapterNumber)}
>
  Add Artifact
</button>

{selectedChapter === ch.chapterNumber && (
  <div style={{ marginTop: "10px" }}>
    <input
      placeholder="Artifact title"
      value={artifactTitle}
      onChange={(e) => setArtifactTitle(e.target.value)}
    />

    <br /><br />

    <textarea
      placeholder="Artifact content"
      value={artifactContent}
      onChange={(e) => setArtifactContent(e.target.value)}
    />

    <br /><br />

        <button
          onClick={async () => {
            await API.post(
              `/story/${id}/chapter/${ch.chapterNumber}/artifact`,
              {
                title: artifactTitle,
                content: artifactContent,
              }
            );

            setArtifactTitle("");
            setArtifactContent("");
            setSelectedChapter(null);
            fetchStory();
          }}
        >
          Save Artifact
        </button>
      </div>
    )}
             
             <button
            onClick={() => {
              setEditingChapter(ch.chapterNumber);
              setChapterNumber(ch.chapterNumber);
              setTitle(ch.title);
              setContent(ch.content);
  }}
>
  Edit
</button>
          </div>
        ))
      )}

      <hr style={{ margin: "30px 0" }} />

      {/* ADD CHAPTER */}
      <h3>Add Chapter</h3>
<input
  placeholder="Chapter number"
  value={chapterNumber}
  disabled={editingChapter !== null}
  onChange={(e) => setChapterNumber(e.target.value)}
/>

      <br /><br />
      <input
  placeholder="Chapter title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

<br /><br />


      <textarea
        placeholder="Chapter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSaveChapter}>
  {editingChapter ? "Update Chapter" : "Add Chapter"}
</button>
    </div>
  );
}

const styles = {
  chapter: {
    border: "1px solid #333",
    padding: "15px",
    marginBottom: "10px",
  },
};

export default EditStory;
