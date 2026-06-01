import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

function StoryReader() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [readChapters, setReadChapters] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStory = async () => {
    try {
      const res = await API.get(`/story/${id}`);
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
    const loadStory = async () => {
      try {
        const res = await API.get(`/story/${id}`);
        setStory(res.data.story);
        setReadChapters(res.data.readChapters);
        setArtifacts(res.data.artifacts);
      } catch (err) {
        console.error("Failed to load story", err);
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, [id]);

  if (loading) {
    return (
      <div className="archive-page archive-page--narrow">
        <div className="archive-loading">Opening the story...</div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="archive-page archive-page--narrow">
        <div className="archive-empty">Story not found.</div>
      </div>
    );
  }

  return (
    <div className="archive-page">
      <header className="reader-header">
        <div>
          <p className="archive-eyebrow">Reader alcove</p>
          <h1 className="archive-section-title">{story.title}</h1>
          <p className="archive-copy">{story.description}</p>
        </div>
      </header>

      <div className="reader-layout">
        <article className="reader-scroll archive-card">
          {story.chapters.map((ch) => (
            <section key={ch.chapterNumber} className="chapter">
              <h3>
                Chapter {ch.chapterNumber}: {ch.title}
              </h3>

              <p>{ch.content}</p>

              {readChapters.includes(ch.chapterNumber) &&
                ch.artifacts &&
                ch.artifacts.map((artifact, index) => (
                  <div key={index} className="artifact">
                    <strong>Relic Unlocked: {artifact.title}</strong>
                    <p>{artifact.content}</p>
                  </div>
                ))}

              {!readChapters.includes(ch.chapterNumber) && (
                <button
                  onClick={() => markRead(ch.chapterNumber)}
                  className="archive-button archive-button--primary"
                >
                  Continue
                </button>
              )}
            </section>
          ))}
        </article>

        <aside className="artifact-panel archive-card">
          <p className="archive-eyebrow">Relic cabinet</p>
          <h3>Artifacts</h3>

          {artifacts.length === 0 && (
            <p className="archive-copy">No artifacts have surfaced yet.</p>
          )}

          {artifacts.map((a) => (
            <div key={a._id} className="artifact">
              <strong>{a.title}</strong>
              <p>{a.content}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

export default StoryReader;
