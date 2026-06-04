import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import "../../css/BalanceCard.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export function BalanceCard() {
  const { profile } = useAuth();
  const [youOwe, setYouOwe] = useState([]);
  const [owesYou, setOwesYou] = useState([]);

  useEffect(() => {
    if (!profile?.id) return;
    async function getBalance() {
      const lostQuery = `/bet_participants?user_id=eq.${profile.id}&is_winner=eq.false&select=bet:bets(stake:stakes(emoji,amount,description))`;
      const lostRes = await fetch(URL + lostQuery, { headers });
      const lostData = await lostRes.json();
      setYouOwe(lostData);

      const wonQuery = `/bet_participants?user_id=eq.${profile.id}&is_winner=eq.true&select=bet:bets(stake:stakes(emoji,amount,description))`;
      const wonRes = await fetch(URL + wonQuery, { headers });
      const wonData = await wonRes.json();
      setOwesYou(wonData);
    }
    getBalance();
  }, [profile?.id]);

  let youOweTotal = 0;
  const youOweEmojis = {};
  for (const row of youOwe) {
    const stake = row.bet?.stake;
    if (!stake) continue;
    const amount = stake.amount ?? 1;
    youOweTotal += amount;
    youOweEmojis[stake.emoji] = (youOweEmojis[stake.emoji] ?? 0) + amount;
  }
  const youOweTopEmoji = Object.entries(youOweEmojis).sort((a, b) => b[1] - a[1])[0]?.[0];

  let owesYouTotal = 0;
  const owesYouEmojis = {};
  for (const row of owesYou) {
    const stake = row.bet?.stake;
    if (!stake) continue;
    const amount = stake.amount ?? 1;
    owesYouTotal += amount;
    owesYouEmojis[stake.emoji] = (owesYouEmojis[stake.emoji] ?? 0) + amount;
  }
  const owesYouTopEmoji = Object.entries(owesYouEmojis).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <div className="balance-card">
      <div className="balance-card__header">
        <h2 className="balance-card__title">Din saldo</h2>
        <button type="button" className="balance-card__link">
          Se historik ›
        </button>
      </div>

      <div className="balance-card__cols">
        <div className="balance-card__col">
          <span className="balance-card__label">Du skylder</span>
          <div className="balance-card__value">
            <span className="balance-card__count">{youOweTotal}</span>
            {youOweTopEmoji && (
              <span className="balance-card__emoji">{youOweTopEmoji}</span>
            )}
          </div>
        </div>

        <div className="balance-card__col">
          <span className="balance-card__label">Skylder dig</span>
          <div className="balance-card__value">
            <span className="balance-card__count balance-card__count--positive">
              {owesYouTotal}
            </span>
            {owesYouTopEmoji && (
              <span className="balance-card__emoji">{owesYouTopEmoji}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
