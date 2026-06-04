import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../AuthContext";
import "../css/NotifikationerPage.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

function NotifikationerPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [notifikationer, setNotifikationer] = useState([]);

  useEffect(() => {
    if (!profile?.id) return;
    async function getNotifications() {
      const query =
        `/bet_participants?user_id=eq.${profile.id}` +
        `&select=role,acceptance,is_winner,bet:bets(id,description,status,created_at,creator:users!bets_creator_id_fkey(name,username),participants:bet_participants(user_id,is_winner,users(name,username))),stake:bets(stake:stakes(emoji))` +
        `&order=bet(created_at).desc`;
      const res = await fetch(URL + query, { headers });
      const data = await res.json();
      const items = data
        .map((row) => buildNotification(row, profile.id))
        .filter(Boolean);
      setNotifikationer(items);
    }
    getNotifications();
  }, [profile?.id]);

  return (
    <div className="notif-page">
      <header className="notif-page__topbar">
        <button
          type="button"
          className="notif-page__back"
          aria-label="Tilbage"
          onClick={() => navigate(-1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="notif-page__title">Notifikationer</h1>
        <span className="notif-page__spacer" />
      </header>

      {notifikationer.length === 0 && (
        <p className="notif-page__empty">Ingen notifikationer endnu.</p>
      )}

      {Object.entries(groupByDay(notifikationer)).map(([label, items]) => (
        <section key={label} className="notif-page__group">
          <p className="notif-page__group-label">{label}</p>
          <div className="notif-page__list">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`notif-card ${item.unread ? "notif-card--unread" : ""}`}
                onClick={() => navigate(`/bets/${item.betId}`)}
              >
                <div className="notif-card__avatar">{item.initial}</div>
                <div className="notif-card__info">
                  <span className="notif-card__text">{item.text}</span>
                  <span className="notif-card__time">{item.time}</span>
                </div>
                {item.unread && <span className="notif-card__dot" />}
              </button>
            ))}
          </div>
        </section>
      ))}

      {notifikationer.length > 0 && (
        <p className="notif-page__mark-all">Markér alle som læst</p>
      )}
    </div>
  );
}

function buildNotification(row, myId) {
  const bet = row.bet;
  if (!bet) return null;

  const opponent = bet.participants?.find((p) => p.user_id !== myId);
  const opponentName = opponent?.users?.name ?? opponent?.users?.username ?? "Nogen";
  const initial = opponentName.charAt(0).toUpperCase();
  const created = new Date(bet.created_at);

  let text = "";
  if (bet.status === "pending" && row.role === "counterparty") {
    text = `${opponentName} sendte dig et nyt bet`;
  } else if (bet.status === "active" && row.role === "creator") {
    text = `${opponentName} godkendte dit bet om ${bet.description}`;
  } else if (bet.status === "resolved" && row.is_winner === true) {
    text = `Afgjorde betet — du vandt ${bet.description}!`;
  } else if (bet.status === "resolved" && row.is_winner === false) {
    text = `Afgjorde betet — du tabte ${bet.description}`;
  } else if (bet.status === "rejected" && row.role === "creator") {
    text = `${opponentName} afviste dit bet`;
  } else if (bet.status === "active" && row.role === "counterparty") {
    text = `Du er aktivt på ${bet.description}`;
  } else {
    return null;
  }

  return {
    id: bet.id + "-" + bet.status,
    betId: bet.id,
    initial,
    text,
    time: timeAgo(created),
    createdAt: created,
    unread: hoursAgo(created) < 24,
  };
}

function timeAgo(date) {
  const now = new Date();
  const diffMin = Math.floor((now - date) / (1000 * 60));
  if (diffMin < 1) return "lige nu";
  if (diffMin < 60) return diffMin + " min siden";
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return diffH + " t siden";
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return "i går";
  return "for " + diffD + " dage siden";
}

function hoursAgo(date) {
  return (new Date() - date) / (1000 * 60 * 60);
}

function groupByDay(items) {
  const groups = {};
  for (const item of items) {
    const h = hoursAgo(item.createdAt);
    let label;
    if (h < 24) label = "I DAG";
    else if (h < 48) label = "I GÅR";
    else label = "TIDLIGERE";
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  }
  return groups;
}

export default NotifikationerPage;
