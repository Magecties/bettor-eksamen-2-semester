import { NavLink } from "react-router";
import "../css/BottomNav.css";

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="bottom-nav__item" end>
        <svg className="bottom-nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11 12 3l9 8v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z" />
        </svg>
        <span>Hjem</span>
      </NavLink>

      <NavLink to="/bets" className="bottom-nav__item">
        <svg className="bottom-nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
        <span>Bets</span>
      </NavLink>

      <NavLink to="/opret" className="bottom-nav__item bottom-nav__item--create">
        <span className="bottom-nav__create-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        <span>Opret</span>
      </NavLink>

      <NavLink to="/venner" className="bottom-nav__item">
        <svg className="bottom-nav__icon" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="8" r="4" />
          <path d="M1 20c0-4 4-6 8-6s8 2 8 6v1H1z" />
          <circle cx="17" cy="9" r="3" />
          <path d="M15 14c4 0 8 2 8 5v1h-7v-1c0-1.8-.8-3.4-2.2-4.6.4-.2.8-.3 1.2-.4z" />
        </svg>
        <span>Venner</span>
      </NavLink>

      <NavLink to="/profile" className="bottom-nav__item">
        <svg className="bottom-nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="10" r="3.5" />
          <path d="M5.5 19c1.2-3 3.8-4.5 6.5-4.5s5.3 1.5 6.5 4.5" />
        </svg>
        <span>Profil</span>
      </NavLink>
    </nav>
  );
}
