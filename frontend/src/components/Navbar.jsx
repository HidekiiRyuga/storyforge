import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="site-nav">
      <div className="site-nav__inner">
        <Link to="/" className="site-nav__brand">
          <span className="site-nav__sigil">✦</span>
          StoryForge
        </Link>

        <div className="site-nav__links">
          <NavLink to="/" className="site-nav__link">
            Archive
          </NavLink>
          <NavLink to="/stories" className="site-nav__link">
            Read
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/create" className="site-nav__link">
              Write
            </NavLink>
          )}

          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className="site-nav__link">
                Login
              </NavLink>
              <NavLink to="/register" className="site-nav__link">
                Join
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className="site-nav__link">
                Desk
              </NavLink>
              <button onClick={handleLogout} className="site-nav__button">
                Leave
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
