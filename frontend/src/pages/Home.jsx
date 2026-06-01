import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__copy">
          <p className="archive-eyebrow">A living archive of hidden tales</p>
          <h1 className="archive-title">StoryForge</h1>
          <p className="archive-copy">
            Step into a cozy fantasy archive where every story opens like a
            secret door, every chapter can reveal a relic, and every writer can
            craft worlds worth wandering through.
          </p>

          <div className="archive-actions">
            <Link to="/stories" className="archive-button archive-button--primary">
              Explore the Archive
            </Link>

            {isAuthenticated ? (
              <Link to="/create" className="archive-button">
                Craft a New Tale
              </Link>
            ) : (
              <Link to="/register" className="archive-button">
                Begin Your Journal
              </Link>
            )}
          </div>
        </div>

        <div className="home-hero__scene archive-card" aria-hidden="true">
          <div className="archive-map">
            <span className="map-line map-line--one" />
            <span className="map-line map-line--two" />
            <span className="map-line map-line--three" />
            <span className="map-pin map-pin--one" />
            <span className="map-pin map-pin--two" />
            <span className="map-pin map-pin--three" />
            <div className="relic-seal">
              <span className="relic-seal__ring" />
              <span className="relic-seal__core">✦</span>
            </div>
            <div className="map-note">
              <strong>Unlocked relic</strong>
              <span>Chapter III</span>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-row" aria-label="StoryForge highlights">
        <article className="feature-card archive-card">
          <p className="archive-eyebrow">Read</p>
          <h3>Seek buried chapters</h3>
          <p className="archive-copy">
            Explore tales hidden within the archive and uncover what each author
            has tucked between the pages.
          </p>
        </article>
        <article className="feature-card archive-card">
          <p className="archive-eyebrow">Write</p>
          <h3>Craft worlds</h3>
          <p className="archive-copy">
            Shape stories chapter by chapter, then invite readers to discover
            the adventure in their own time.
          </p>
        </article>
        <article className="feature-card archive-card">
          <p className="archive-eyebrow">Unlock</p>
          <h3>Reveal relics</h3>
          <p className="archive-copy">
            Reward curious readers with artifacts that make each story feel like
            a mystery worth solving.
          </p>
        </article>
      </section>
    </>
  );
}

export default Home;
