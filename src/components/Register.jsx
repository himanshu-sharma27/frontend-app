import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Register() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user.name || !user.email || !user.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const url = API_URL + "/auth/signup";
      await axios.post(url, user);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <div className="auth-logo-icon">
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M3 6a3 3 0 013-3h8a3 3 0 013 3v1H3V6zM3 9h14v7a3 3 0 01-3 3H6a3 3 0 01-3-3V9z" fill="currentColor"/>
            </svg>
          </div>
        </div>

        <h1 className="auth-heading">Create your account</h1>
        <p className="auth-subheading">Join thousands of happy shoppers today</p>

        {error && (
          <div className="auth-error">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M7 4v3.5M7 9.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}

        <div className="auth-form">
          <div className="auth-input-group">
            <label className="auth-label">Full name</label>
            <input
              type="text"
              className="auth-input"
              placeholder="Alex Johnson"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="name"
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Email address</label>
            <input
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              onKeyDown={handleKeyDown}
              autoComplete="email"
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              placeholder="Create a strong password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              onKeyDown={handleKeyDown}
              autoComplete="new-password"
            />
          </div>

          <button
            className="auth-submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </div>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </div>

      </div>
    </div>
  );
}

export default Register;
