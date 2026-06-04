import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../AuthContext";
import "../css/AuthPages.css";

function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    const err = await signUp(email, password, name, username);
    if (err) {
      setError(err.message);
      return;
    }
    navigate("/");
  }

  return (
    <div className="auth-page">
      <h1>Opret konto</h1>
      <p className="auth-page__subtitle">Kom i gang med dine første bets.</p>

      {error && <p className="auth-page__error">{error}</p>}

      <form className="auth-page__form" onSubmit={handleSubmit}>
        <label className="auth-page__field">
          <span>Navn</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="auth-page__field">
          <span>Brugernavn</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className="auth-page__field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="auth-page__field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>

        <button type="submit" className="auth-page__cta">
          Opret konto
        </button>
      </form>

      <p className="auth-page__switch">
        Har du allerede en konto? <Link to="/login">Log ind</Link>
      </p>
    </div>
  );
}

export default SignupPage;
