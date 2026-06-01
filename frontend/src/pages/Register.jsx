import { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", {
        email,
        password,
      });

      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-card archive-card">
        <div className="auth-card__intro">
          <p className="archive-eyebrow">New keeper</p>
          <h1 className="archive-section-title">Join StoryForge</h1>
          <p className="archive-copy">
            Claim a desk in the archive and begin crafting worlds readers can
            wander through.
          </p>
        </div>

        <div className="archive-form">
          <div className="archive-field">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              className="archive-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="archive-field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              className="archive-input"
              type="password"
              placeholder="Create a secret key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            className="archive-button archive-button--primary"
          >
            Open My Desk
          </button>
        </div>

        <p className="auth-switch">
          Already have a pass? <Link to="/login">Return to the archive</Link>
        </p>
      </section>
    </div>
  );
}

export default Register;
