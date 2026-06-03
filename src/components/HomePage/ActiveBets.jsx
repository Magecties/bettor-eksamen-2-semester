import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ActiveBetCard } from "./ActiveBetCard";
import "../../css/ActiveBets.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

const CURRENT_USER_ID = 1;

export function ActiveBets() {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    async function getActiveBets() {
      const query =
        `/bet_participants?user_id=eq.${CURRENT_USER_ID}` +
        `&select=bet:bets!inner(id,description,created_at,status,stake:stakes(emoji),participants:bet_participants(user_id,users(name)))` +
        `&bet.status=eq.active`;
      const response = await fetch(URL + query, { headers });
      const data = await response.json();
      setBets(data.map((row) => row.bet).filter(Boolean));
    }
    getActiveBets();
  }, []);

  return (
    <section className="active-bets">
      <div className="active-bets__header">
        <h2 className="active-bets__title">Aktive bets</h2>
        {bets.length > 0 && (
          <Link to="/bets" className="active-bets__link">
            Se alle ›
          </Link>
        )}
      </div>

      {bets.length === 0 ? (
        <div className="active-bets__empty">
          <p>Ingen aktive bets lige nu</p>
          <Link to="/opret" className="active-bets__cta">
            Vil du oprette? ›
          </Link>
        </div>
      ) : (
        <div className="active-bets__list">
          {bets.map((bet) => {
            const opponent = bet.participants?.find(
              (p) => p.user_id !== CURRENT_USER_ID
            );
            return (
              <ActiveBetCard
                key={bet.id}
                opponentName={opponent?.users?.name}
                description={bet.description}
                emoji={bet.stake?.emoji}
                createdAt={bet.created_at}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
