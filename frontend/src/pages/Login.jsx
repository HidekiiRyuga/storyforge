import { useState } from "react";
import API from "../api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const message = location.state?.message;

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-card archive-card">
        <div className="auth-card__intro">
          <p className="archive-eyebrow">Archive pass</p>
          <h1 className="archive-section-title">Return to the stacks</h1>
          <p className="archive-copy">
            Sign in to continue writing, reading, and uncovering the relics
            waiting inside your stories.
          </p>
        </div>

        {message && <p className="auth-message">{message}</p>}

        <div className="archive-form">
          <div className="archive-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              className="archive-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="archive-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="archive-input"
              type="password"
              placeholder="Your secret key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="archive-button archive-button--primary"
          >
            Enter Archive
          </button>
        </div>

        <p className="auth-switch">
          New to StoryForge? <Link to="/register">Begin your journal</Link>
        </p>
      </section>
    </div>
  );
}

export default Login;
