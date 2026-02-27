import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 same as login page

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", {
        email,
        password,
      });

      // 👇 automatically log user in
      login(res.data.token);

      // 👇 go straight to dashboard
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Register</h2>

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

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
