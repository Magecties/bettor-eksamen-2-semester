import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../AuthContext";
import "../css/AfgoerBetPage.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

function AfgoerBetPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();

  const [bet, setBet] = useState(null);
  const [vinderId, setVinderId] = useState(null);
  const [sender, setSender] = useState(false);

  useEffect(() => {
    async function getBet() {
      const query = `/bets?id=eq.${id}&select=*,participants:bet_participants(user_id,role,user:users(id,name,username,avatar))`;
      const res = await fetch(URL + query, { headers });
      const data = await res.json();
      setBet(data[0]);
    }
    getBet();
  }, [id]);

  if (!bet || !profile) {
    return (
      <div className="afgoer-bet">
        <p className="afgoer-bet__loading">Indlæser…</p>
      </div>
    );
  }

  async function handleConfirm() {
    if (!vinderId) return;
    setSender(true);

    for (const p of bet.participants) {
      await fetch(URL + `/bet_participants?bet_id=eq.${bet.id}&user_id=eq.${p.user_id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ is_winner: p.user_id === vinderId }),
      });
    }

    await fetch(URL + `/bets?id=eq.${bet.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: "resolved" }),
    });

    navigate(`/bets/${bet.id}`);
  }

  return (
    <div className="afgoer-bet">
      <div className="afgoer-bet__handle" />

      <h1 className="afgoer-bet__title">Hvem vandt?</h1>
      <p className="afgoer-bet__quote">"{bet.description}"</p>

      <div className="afgoer-bet__list">
        {bet.participants?.map((p) => {
          const navn = p.user?.name ?? p.user?.username ?? "?";
          const initial = navn.charAt(0).toUpperCase();
          const isMe = p.user_id === profile.id;
          const valgt = vinderId === p.user_id;
          return (
            <button
              key={p.user_id}
              type="button"
              className={`afgoer-bet__option ${valgt ? "afgoer-bet__option--selected" : ""}`}
              onClick={() => setVinderId(p.user_id)}
            >
              <div className="afgoer-bet__avatar">{initial}</div>
              <div className="afgoer-bet__info">
                <span className="afgoer-bet__name">
                  {navn} {isMe && <span className="afgoer-bet__me">(mig)</span>}
                </span>
                <span className="afgoer-bet__status">
                  {valgt ? "Vinder 🏆" : "Vælg som vinder"}
                </span>
              </div>
              {valgt && <span className="afgoer-bet__check">✓</span>}
            </button>
          );
        })}
      </div>

      <div className="afgoer-bet__footer">
        <button
          type="button"
          className="afgoer-bet__confirm"
          onClick={handleConfirm}
          disabled={!vinderId || sender}
        >
          {sender ? "Gemmer…" : "Bekræft afgørelse"}
        </button>
        <button
          type="button"
          className="afgoer-bet__cancel"
          onClick={() => navigate(`/bets/${bet.id}`)}
        >
          Annullér
        </button>
      </div>
    </div>
  );
}

export default AfgoerBetPage;
