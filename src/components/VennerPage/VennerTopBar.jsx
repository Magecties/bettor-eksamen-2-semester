import { useNavigate } from "react-router";
import "../../css/VennerTopBar.css";

export function VennerTopBar() {
  const navigate = useNavigate();
  return (
    <div className="venner-topbar">
      <h1 className="venner-topbar__title">Venner</h1>

      <div className="venner-topbar__actions">
        <button
          type="button"
          className="venner-topbar__btn"
          aria-label="Notifikationer"
          onClick={() => navigate("/notifikationer")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        <button type="button" className="venner-topbar__btn" aria-label="Søg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
