import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

function EditStory() {
  const { id } = useParams();
  const [artifactTitle, setArtifactTitle] = useState("");
  const [artifactContent, setArtifactContent] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(null);
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
    const loadStory = async () => {
      const res = await API.get(`/story/${id}`);
      setStory(res.data.story);
    };

    loadStory();
  }, [id]);

  const handleSaveChapter = async () => {
    try {
      if (editingChapter) {
        await API.put(`/story/${id}/chapter/${editingChapter}`, {
          title,
          content,
        });
      } else {
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

  const saveArtifact = async (chapterNumberToUpdate) => {
    await API.post(`/story/${id}/chapter/${chapterNumberToUpdate}/artifact`, {
      title: artifactTitle,
      content: artifactContent,
    });

    setArtifactTitle("");
    setArtifactContent("");
    setSelectedChapter(null);
    fetchStory();
  };

  const startEditingChapter = (chapter) => {
    setEditingChapter(chapter.chapterNumber);
    setChapterNumber(chapter.chapterNumber);
    setTitle(chapter.title);
    setContent(chapter.content);
  };

  if (!story) {
    return (
      <div className="archive-page archive-page--narrow">
        <div className="archive-loading">Loading manuscript...</div>
      </div>
    );
  }

  return (
    <div className="archive-page">
      <header className="edit-header">
        <div>
          <p className="archive-eyebrow">Manuscript desk</p>
          <h1 className="archive-section-title">Edit Story: {story.title}</h1>
          <p className="archive-copy">
            Refine chapters, arrange the journey, and hide artifacts for readers
            to uncover.
          </p>
        </div>
      </header>

      <div className="edit-layout">
        <section>
          <p className="archive-eyebrow">Chapters</p>

          {story.chapters.length === 0 ? (
            <div className="archive-empty">No chapters yet.</div>
          ) : (
            <div className="chapter-editor-list">
              {story.chapters.map((ch) => (
                <article
                  key={ch.chapterNumber}
                  className="chapter-editor-card archive-card"
                >
                  <h3>
                    Chapter {ch.chapterNumber}: {ch.title}
                  </h3>
                  <p className="archive-copy">{ch.content}</p>

                  <div className="archive-actions">
                    <button
                      onClick={() => startEditingChapter(ch)}
                      className="archive-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setSelectedChapter(ch.chapterNumber)}
                      className="archive-button"
                    >
                      Add Artifact
                    </button>
                    <button
                      onClick={() => deleteChapter(ch.chapterNumber)}
                      className="archive-button archive-button--danger"
                    >
                      Delete
                    </button>
                  </div>

                  {selectedChapter === ch.chapterNumber && (
                    <div className="inline-artifact-form">
                      <div className="archive-form">
                        <div className="archive-field">
                          <label htmlFor={`artifact-title-${ch.chapterNumber}`}>
                            Artifact title
                          </label>
                          <input
                            id={`artifact-title-${ch.chapterNumber}`}
                            className="archive-input"
                            placeholder="Moonlit compass"
                            value={artifactTitle}
                            onChange={(e) => setArtifactTitle(e.target.value)}
                          />
                        </div>

                        <div className="archive-field">
                          <label htmlFor={`artifact-content-${ch.chapterNumber}`}>
                            Artifact content
                          </label>
                          <textarea
                            id={`artifact-content-${ch.chapterNumber}`}
                            className="archive-textarea"
                            placeholder="A clue, memory, map fragment, or secret reward."
                            value={artifactContent}
                            onChange={(e) => setArtifactContent(e.target.value)}
                          />
                        </div>

                        <div className="archive-actions">
                          <button
                            onClick={() => saveArtifact(ch.chapterNumber)}
                            className="archive-button archive-button--primary"
                          >
                            Save Artifact
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="chapter-editor-card archive-card">
          <p className="archive-eyebrow">
            {editingChapter ? "Revise chapter" : "Add chapter"}
          </p>
          <h3>{editingChapter ? "Update the page" : "Open a new page"}</h3>

          <div className="archive-form">
            <div className="archive-field">
              <label htmlFor="chapter-number">Chapter number</label>
              <input
                id="chapter-number"
                className="archive-input"
                placeholder="1"
                value={chapterNumber}
                disabled={editingChapter !== null}
                onChange={(e) => setChapterNumber(e.target.value)}
              />
            </div>

            <div className="archive-field">
              <label htmlFor="chapter-title">Chapter title</label>
              <input
                id="chapter-title"
                className="archive-input"
                placeholder="The Door Beneath the Stairs"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="archive-field">
              <label htmlFor="chapter-content">Chapter content</label>
              <textarea
                id="chapter-content"
                className="archive-textarea"
                placeholder="Write the next passage of the adventure."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="archive-actions">
              <button
                onClick={handleSaveChapter}
                className="archive-button archive-button--primary"
              >
                {editingChapter ? "Update Chapter" : "Add Chapter"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default EditStory;
