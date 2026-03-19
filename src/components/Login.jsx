
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const { user, setUser, cart } = useContext(AppContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!user?.email || !user?.password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const url = API_URL + "/auth/signin";
      const response = await axios.post(url, user);
      setUser(response.data);
      if (cart.length > 0) navigate("/cart");
      else navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
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

        <h1 className="auth-heading">Welcome back</h1>
        <p className="auth-subheading">Sign in to your account to continue shopping</p>

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
            <label className="auth-label">Email address</label>
            <input
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="email"
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              placeholder="Enter your password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
            />
          </div>

          <button
            className="auth-submit-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Create one free</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
