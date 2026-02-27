import { useState } from "react";
import API from "../api";
import { useNavigate, useLocation } from "react-router-dom"; // 👈 merged imports
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); // 👈 read data from previous page
  const { login } = useAuth();

  // 👇 message passed from Register page
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
    <div style={{ padding: 40 }}>
      
      {/* 👇 SUCCESS MESSAGE DISPLAY */}
      {message && (
        <p style={{ color: "lightgreen", marginBottom: "10px" }}>
          {message}
        </p>
      )}

      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
