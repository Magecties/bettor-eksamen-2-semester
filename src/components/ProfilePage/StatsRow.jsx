import { useEffect, useState } from "react";
import "../../css/StatsRow.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

const CURRENT_USER_ID = 1;

export function StatsRow() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    async function getStats() {
      const query = `/bet_participants?user_id=eq.${CURRENT_USER_ID}&is_winner=not.is.null&select=is_winner,bet:bets(created_at)`;
      const response = await fetch(URL + query, { headers });
      const data = await response.json();
      setParticipants(data);
    }
    getStats();
  }, []);

  const wins = participants.filter((p) => p.is_winner === true).length;
  const losses = participants.filter((p) => p.is_winner === false).length;
  const total = wins + losses;
  const winRate = total === 0 ? 0 : Math.round((wins / total) * 100);

  const sorted = [...participants].sort(
    (a, b) => new Date(b.bet?.created_at) - new Date(a.bet?.created_at)
  );
  let streak = 0;
  for (const p of sorted) {
    if (p.is_winner === true) streak++;
    else break;
  }

  return (
    <div className="stats-row">
      <div className="stats-row__item">
        <span className="stats-row__value stats-row__value--win">{wins}</span>
        <span className="stats-row__label">Sejre</span>
      </div>

      <div className="stats-row__item">
        <span className="stats-row__value stats-row__value--loss">
          {losses}
        </span>
        <span className="stats-row__label">Nederlag</span>
      </div>

      <div className="stats-row__item">
        <span className="stats-row__value">{winRate}%</span>
        <span className="stats-row__label">Win-rate</span>
      </div>

      <div className="stats-row__item">
        <span className="stats-row__value">
          {streak} <span className="stats-row__emoji">🔥</span>
        </span>
        <span className="stats-row__label">Streak</span>
      </div>
    </div>
  );
}
