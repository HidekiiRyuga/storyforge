import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

function StoryReader() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [readChapters, setReadChapters] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revealedArtifacts, setRevealedArtifacts] = useState([]);

  const revealedArtifactsKey = `storyforge-revealed-artifacts-${id}`;

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

  const revealArtifact = (artifactKey) => {
    setRevealedArtifacts((currentArtifacts) => {
      if (currentArtifacts.includes(artifactKey)) {
        return currentArtifacts;
      }

      const updatedArtifacts = [...currentArtifacts, artifactKey];
      localStorage.setItem(
        revealedArtifactsKey,
        JSON.stringify(updatedArtifacts)
      );
      return updatedArtifacts;
    });
  };

  const isArtifactRevealed = (artifactKey) =>
    revealedArtifacts.includes(artifactKey);

  useEffect(() => {
    const savedArtifacts = localStorage.getItem(revealedArtifactsKey);
    setRevealedArtifacts(savedArtifacts ? JSON.parse(savedArtifacts) : []);

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

  const chapterArtifacts = story.chapters.flatMap((chapter) => {
    if (!readChapters.includes(chapter.chapterNumber) || !chapter.artifacts) {
      return [];
    }

    return chapter.artifacts.map((artifact, index) => ({
      ...artifact,
      artifactKey: `chapter-${chapter.chapterNumber}-${artifact._id || index}`,
      chapterNumber: chapter.chapterNumber,
    }));
  });

  const collectedArtifacts = [
    ...chapterArtifacts,
    ...artifacts.map((artifact) => ({
      ...artifact,
      artifactKey: `artifact-${artifact._id}`,
    })),
  ];

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
                ch.artifacts.map((artifact, index) => {
                  const artifactKey = `chapter-${ch.chapterNumber}-${
                    artifact._id || index
                  }`;
                  const revealed = isArtifactRevealed(artifactKey);

                  return (
                    <div key={artifactKey} className="artifact">
                      <strong>{artifact.title}</strong>

                      {revealed ? (
                        <p>{artifact.content}</p>
                      ) : (
                        <button
                          onClick={() => revealArtifact(artifactKey)}
                          className="archive-button archive-button--primary"
                        >
                          Reveal Artifact
                        </button>
                      )}
                    </div>
                  );
                })}

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

          {collectedArtifacts.length === 0 && (
            <p className="archive-copy">
              Artifacts will appear here after you finish chapters that contain
              them.
            </p>
          )}

          {collectedArtifacts.map((a) => {
            const revealed = isArtifactRevealed(a.artifactKey);

            return (
              <div key={a.artifactKey} className="artifact">
                <strong>{a.title}</strong>
                {a.chapterNumber && (
                  <span className="artifact-meta">
                    Chapter {a.chapterNumber}
                  </span>
                )}

                {revealed ? (
                  <p>{a.content}</p>
                ) : (
                  <button
                    onClick={() => revealArtifact(a.artifactKey)}
                    className="archive-button archive-button--primary"
                  >
                    Reveal Artifact
                  </button>
                )}
              </div>
            );
          })}
        </aside>
      </div>
    </div>
  );
}

export default StoryReader;
