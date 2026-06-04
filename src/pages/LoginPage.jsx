import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../AuthContext";
import "../css/AuthPages.css";

function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    const err = await signIn(email, password);
    if (err) {
      setError(err.message);
      return;
    }
    navigate("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-page__body">
        <p className="auth-page__eyebrow">Log ind</p>
        <h1 className="auth-page__title">
          Velkommen <em>tilbage.</em>
        </h1>
        <p className="auth-page__text">
          Dine bets, venner og indsatser venter på dig.
        </p>

        {error && <p className="auth-page__error">{error}</p>}

        <form className="auth-page__form" onSubmit={handleSubmit}>
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
              required
            />
          </label>

          <button type="submit" className="auth-page__cta">
            Log ind →
          </button>
        </form>

        <p className="auth-page__switch">
          Har du ingen konto? <Link to="/signup">Opret en</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
