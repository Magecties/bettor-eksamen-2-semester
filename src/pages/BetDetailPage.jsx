import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../AuthContext";
import "../css/BetDetailPage.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

function BetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [bet, setBet] = useState(null);

  async function getBet() {
    const query = `/bets?id=eq.${id}&select=*,creator:users!bets_creator_id_fkey(name,username,avatar),participants:bet_participants(*,user:users(name,username,avatar)),stake:stakes(*)`;
    const res = await fetch(URL + query, { headers });
    const data = await res.json();
    setBet(data[0]);
  }

  useEffect(() => {
    getBet();
  }, [id]);

  if (!bet || !profile) {
    return (
      <div className="bet-detail">
        <p className="bet-detail__loading">Indlæser…</p>
      </div>
    );
  }

  const me = bet.participants?.find((p) => p.user_id === profile.id);
  const opponent = bet.participants?.find((p) => p.user_id !== profile.id);
  const opponentName = opponent?.user?.name ?? opponent?.user?.username ?? "?";

  const erDinTur = me?.role === "counterparty" && me?.acceptance === "pending";
  const erAfventer = me?.role === "creator" && bet.status === "pending";
  const erAktiv = bet.status === "active" && me && me.is_winner === null;

  const createdDate = new Date(bet.created_at).toLocaleString("da-DK", {
    dateStyle: "long",
    timeStyle: "short",
  });

  async function handleGodkend() {
    await fetch(URL + `/bet_participants?bet_id=eq.${bet.id}&user_id=eq.${profile.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ acceptance: "accepted" }),
    });
    await fetch(URL + `/bets?id=eq.${bet.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: "active" }),
    });
    getBet();
  }

  async function handleAfvis() {
    await fetch(URL + `/bet_participants?bet_id=eq.${bet.id}&user_id=eq.${profile.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ acceptance: "rejected" }),
    });
    await fetch(URL + `/bets?id=eq.${bet.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: "rejected" }),
    });
    getBet();
  }

  async function handleAfgoer(jegVandt) {
    const motId = opponent?.user_id;
    await fetch(URL + `/bet_participants?bet_id=eq.${bet.id}&user_id=eq.${profile.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ is_winner: jegVandt }),
    });
    if (motId) {
      await fetch(URL + `/bet_participants?bet_id=eq.${bet.id}&user_id=eq.${motId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ is_winner: !jegVandt }),
      });
    }
    await fetch(URL + `/bets?id=eq.${bet.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: "resolved" }),
    });
    getBet();
  }

  function getBadge() {
    if (erDinTur) return { label: "Din tur", klasse: "din-tur" };
    if (erAfventer) return { label: "Afventer", klasse: "afventer" };
    if (bet.status === "active") return { label: "Aktiv", klasse: "aktiv" };
    if (bet.status === "resolved") return { label: "Afgjort", klasse: "afventer" };
    if (bet.status === "rejected") return { label: "Afvist", klasse: "afventer" };
    return { label: bet.status, klasse: "afventer" };
  }

  const badge = getBadge();
  const vinder = bet.participants?.find((p) => p.is_winner === true);

  return (
    <div className="bet-detail">
      <header className="bet-detail__topbar">
        <button
          type="button"
          className="bet-detail__back"
          aria-label="Tilbage"
          onClick={() => navigate(-1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className={`bet-detail__badge ${badge.klasse}`}>{badge.label}</span>
      </header>

      <div className="bet-detail__body">
        <p className="bet-detail__eyebrow">Bettet</p>
        <h1 className="bet-detail__description">"{bet.description}"</h1>

        {bet.stake && (
          <div className="bet-detail__stake">
            <span className="bet-detail__stake-emoji">{bet.stake.emoji}</span>
            <span>{bet.stake.description}</span>
          </div>
        )}

        <section className="bet-detail__section">
          <p className="bet-detail__label">Spillere</p>
          <div className="bet-detail__players">
            {bet.participants?.map((p) => {
              const navn = p.user?.name ?? p.user?.username ?? "?";
              const initial = navn.charAt(0).toUpperCase();
              const isMe = p.user_id === profile.id;
              return (
                <div key={p.user_id} className="bet-detail__player">
                  <div className="bet-detail__player-avatar">
                    {p.user?.avatar ? (
                      <img src={p.user.avatar} alt={navn} />
                    ) : (
                      initial
                    )}
                  </div>
                  <div className="bet-detail__player-info">
                    <span className="bet-detail__player-name">
                      {isMe ? "Dig" : navn}
                    </span>
                    <span className="bet-detail__player-role">
                      {p.role === "creator" ? "Oprettede bettet" : "Modstander"}
                      {p.acceptance === "pending" && " · venter"}
                      {p.acceptance === "rejected" && " · afviste"}
                      {p.is_winner === true && " · 🏆 vandt"}
                      {p.is_winner === false && " · tabte"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bet-detail__section">
          <p className="bet-detail__label">Oprettet</p>
          <p className="bet-detail__meta">{createdDate}</p>
        </section>

        {bet.status === "resolved" && vinder && (
          <section className="bet-detail__section bet-detail__winner">
            <p>
              🏆 <strong>
                {vinder.user_id === profile.id
                  ? "Du vandt!"
                  : (vinder.user?.name ?? "Modstanderen") + " vandt"}
              </strong>
            </p>
          </section>
        )}
      </div>

      <div className="bet-detail__footer">
        {erDinTur && (
          <div className="bet-detail__actions">
            <button className="bet-detail__afvis" onClick={handleAfvis}>
              Afvis
            </button>
            <button className="bet-detail__godkend" onClick={handleGodkend}>
              Godkend bet →
            </button>
          </div>
        )}

        {erAktiv && (
          <button
            className="bet-detail__godkend bet-detail__afgoer"
            onClick={() => navigate(`/bets/${bet.id}/afgoer`)}
          >
            Afgør bet →
          </button>
        )}

        {erAfventer && (
          <p className="bet-detail__pending-text">
            ◌ Venter på at {opponentName} godkender
          </p>
        )}
      </div>
    </div>
  );
}

export default BetDetailPage;
