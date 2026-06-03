import { useEffect, useState } from "react";
import "../../css/PendingCard.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

const CURRENT_USER_ID = 1;

export function PendingCard() {
  const [acceptances, setAcceptances] = useState(0);
  const [resolutions, setResolutions] = useState(0);

  useEffect(() => {
    async function getPending() {
      const acceptQuery = `/bet_participants?user_id=eq.${CURRENT_USER_ID}&acceptance=eq.pending&select=bet_id`;
      const acceptRes = await fetch(URL + acceptQuery, { headers });
      const acceptData = await acceptRes.json();
      setAcceptances(acceptData.length);

      const resolveQuery = `/bet_participants?user_id=eq.${CURRENT_USER_ID}&is_winner=is.null&acceptance=eq.accepted&select=bet:bets!inner(status)&bet.status=eq.active`;
      const resolveRes = await fetch(URL + resolveQuery, { headers });
      const resolveData = await resolveRes.json();
      setResolutions(resolveData.length);
    }
    getPending();
  }, []);

  const total = acceptances + resolutions;

  if (total === 0) return null;

  const parts = [];
  if (acceptances > 0) {
    parts.push(acceptances + (acceptances === 1 ? " godkendelse" : " godkendelser"));
  }
  if (resolutions > 0) {
    parts.push(resolutions + (resolutions === 1 ? " afgørelse" : " afgørelser"));
  }

  return (
    <button type="button" className="pending-card">
      <span className="pending-card__icon">⏰</span>
      <div className="pending-card__info">
        <h2 className="pending-card__title">
          {total} {total === 1 ? "bet venter" : "bets venter"} på dig
        </h2>
        <p className="pending-card__subtitle">{parts.join(" · ")}</p>
      </div>
      <span className="pending-card__arrow">›</span>
    </button>
  );
}
