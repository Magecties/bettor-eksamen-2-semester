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
      <div className="auth-page__body">
        <p className="auth-page__eyebrow">Opret konto</p>
        <h1 className="auth-page__title">
          Klar til at <em>presse vennerne?</em>
        </h1>
        <p className="auth-page__text">
          Tag tre sekunder. Så er du på.
        </p>

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
            Opret konto →
          </button>
        </form>

        <p className="auth-page__switch">
          Har du allerede en konto? <Link to="/login">Log ind</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
