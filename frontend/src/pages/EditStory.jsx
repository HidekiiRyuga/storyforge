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
  const [expandedChapters, setExpandedChapters] = useState([]);
  const [chapterSort, setChapterSort] = useState("newest");
  const [artifacts, setArtifacts] = useState([]);
  const [editingArtifact, setEditingArtifact] = useState(null);

  const getSortedChapters = () => {
    const chapters = [...story.chapters];

    if (chapterSort === "oldest") {
      return chapters;
    }

    if (chapterSort === "chapter-asc") {
      return chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
    }

    if (chapterSort === "chapter-desc") {
      return chapters.sort((a, b) => b.chapterNumber - a.chapterNumber);
    }

    return chapters.reverse();
  };

  const toggleChapterPreview = (chapterNumberToToggle) => {
    setExpandedChapters((currentChapters) =>
      currentChapters.includes(chapterNumberToToggle)
        ? currentChapters.filter((num) => num !== chapterNumberToToggle)
        : [...currentChapters, chapterNumberToToggle]
    );
  };

  const getChapterPreview = (chapter) => {
    const isExpanded = expandedChapters.includes(chapter.chapterNumber);
    const isLong = chapter.content.length > 320;

    if (isExpanded || !isLong) {
      return chapter.content;
    }

    return `${chapter.content.slice(0, 320).trim()}...`;
  };

  const fetchStory = async () => {
    const res = await API.get(`/story/${id}`);
    setStory(res.data.story);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchStory();
      await fetchArtifacts();
    };

    loadData();
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
    await fetchArtifacts();
    
    setArtifactTitle("");
    setArtifactContent("");
    setSelectedChapter(null);
    fetchStory();
  };
  const fetchArtifacts = async () => {
    const res = await API.get(`/story/${id}/artifacts`);
    setArtifacts(res.data);
  };

  const startEditingChapter = (chapter) => {
    setEditingChapter(chapter.chapterNumber);
    setChapterNumber(chapter.chapterNumber);
    setTitle(chapter.title);
    setContent(chapter.content);
  };
const deleteArtifact = async (artifactId) => {
  if (!window.confirm("Delete this artifact?")) {
    return;
  }

  try {
    await API.delete(`/story/artifact/${artifactId}`);

    fetchArtifacts();

  } catch (err) {
  console.error(err);

  console.log(err.response?.data);

  alert("Failed to delete artifact");
}
};
const updateArtifact = async () => {
  await API.put(
    `/story/artifact/${editingArtifact._id}`,
    {
      title: artifactTitle,
      content: artifactContent,
    }
  );

  setEditingArtifact(null);
  fetchArtifacts();
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
          <div className="chapter-toolbar">
            <p className="archive-eyebrow">Chapters</p>

            {story.chapters.length > 1 && (
              <label className="chapter-sort">
                <span>Sort by</span>
                <select
                  className="archive-input"
                  value={chapterSort}
                  onChange={(e) => setChapterSort(e.target.value)}
                >
                  <option value="newest">Newest added first</option>
                  <option value="oldest">Oldest added first</option>
                  <option value="chapter-asc">Chapter number: 1 to 9</option>
                  <option value="chapter-desc">Chapter number: 9 to 1</option>
                </select>
              </label>
            )}
          </div>

          {story.chapters.length === 0 ? (
            <div className="archive-empty">No chapters yet.</div>
          ) : (
            <div className="chapter-editor-list">
              {getSortedChapters().map((ch) => {
                const isLongChapter = ch.content.length > 320;
                const isExpanded = expandedChapters.includes(ch.chapterNumber);

                return (
                <article
                  key={ch.chapterNumber}
                  className="chapter-editor-card archive-card"
                >
                  <h3>
                    Chapter {ch.chapterNumber}: {ch.title}
                  </h3>
                  
                  <p className="archive-copy chapter-preview">
                    {getChapterPreview(ch)}
                  </p>
                  {isLongChapter && (
                    <button
                      onClick={() => toggleChapterPreview(ch.chapterNumber)}
                      className="text-button"
                    >
                      {isExpanded ? "View less" : "View more"}
                    </button>
                  )}
                  {artifacts
                  .filter(
                    (artifact) =>
                      artifact.unlockChapter === ch.chapterNumber
                  )
                  .map((artifact) => (
                    <div
                      key={artifact._id}
                      style={{
                        marginTop: "10px",
                        padding: "10px",
                        border: "1px solid #444",
                        borderRadius: "8px",
                      }}
                    >
                      <strong>🔮 {artifact.title}</strong>
                      <p>{artifact.content}</p>
                      <button
                      onClick={() => {
                        setEditingArtifact(artifact);
                        setArtifactTitle(artifact.title);
                        setArtifactContent(artifact.content);
                      }}
                      className="archive-button archive-button--quiet"
                    >
                      ✦ Edit Relic
                    </button>
                   {editingArtifact?._id === artifact._id && (
                      <div className="artifact-editor">
                        <h4>✦ Revise Relic</h4>

                        <div className="archive-form">

                          <div className="archive-field">
                            <label>Relic Name</label>
                            <input
                              className="archive-input"
                              value={artifactTitle}
                              onChange={(e) => setArtifactTitle(e.target.value)}
                            />
                          </div>

                          <div className="archive-field">
                            <label>Relic Description</label>
                            <textarea
                              className="archive-textarea"
                              value={artifactContent}
                              onChange={(e) => setArtifactContent(e.target.value)}
                            />
                          </div>

                          <div className="artifact-actions">
                            <button
                              onClick={updateArtifact}
                              className="archive-button archive-button--primary"
                            >
                              Save Changes
                            </button>

                            <button
                              onClick={() => setEditingArtifact(null)}
                              className="archive-button archive-button--quiet"
                            >
                              Cancel
                            </button>
                          </div>

                        </div>
                      </div>
                    )}

                      <button
                    onClick={() => deleteArtifact(artifact._id)}
                    className="archive-button archive-button--danger"
                  >
                    🗑 Discard Relic
                  </button>

                    </div>
                    
                  ))}

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
                );
              })}
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
