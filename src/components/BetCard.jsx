const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function BetCard({ bet, creatorId, onUpdated }) {
  const formattedDate = new Date(bet.created_at).toLocaleString("da-DK", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const modstander = bet.participants?.find((p) => p.role === "counterparty");
  const modstanderNavn = modstander?.user?.name ?? modstander?.user?.username ?? "?";
  const modstanderInitial = modstanderNavn[0].toUpperCase();

  const minDeltager = bet.participants?.find((p) => p.user_id === creatorId);
  const erDinTur = minDeltager?.role === "counterparty" && minDeltager?.acceptance === "pending";
  const erAfventer = minDeltager?.role === "creator" && bet.status === "pending";

  function getBadge() {
    if (erDinTur) return { label: "Din tur", klasse: "din-tur" };
    if (erAfventer) return { label: "Afventer", klasse: "afventer" };
    if (bet.status === "active") return { label: "Aktiv", klasse: "aktiv" };
    return { label: bet.status, klasse: "afventer" };
  }

  const badge = getBadge();

  async function handleGodkend() {
    await fetch(
      URL + `/bet_participants?bet_id=eq.${bet.id}&user_id=eq.${creatorId}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ acceptance: "accepted" }),
      }
    );
    await fetch(URL + `/bets?id=eq.${bet.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: "active" }),
    });
    onUpdated?.();
  }

  async function handleAfvis() {
    await fetch(
      URL + `/bet_participants?bet_id=eq.${bet.id}&user_id=eq.${creatorId}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ acceptance: "rejected" }),
      }
    );
    await fetch(URL + `/bets?id=eq.${bet.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: "rejected" }),
    });
    onUpdated?.();
  }

  return (
    <article className={`bet-card ${erDinTur ? "din-tur" : ""}`}>
      <div className="bet-card-top">
        <div className="bet-avatarer">
          <div className="bet-avatar bet-avatar-dig">D</div>
          <div className="bet-avatar bet-avatar-mod">
            {modstander?.user?.avatar ? (
              <img src={modstander.user.avatar} alt={modstanderNavn} />
            ) : (
              modstanderInitial
            )}
          </div>
        </div>
        <p className="bet-players">
          Dig <span>mod</span> {modstanderNavn}
        </p>
        <span className={`bet-badge ${badge.klasse}`}>{badge.label}</span>
      </div>

      <h2>"{bet.description}"</h2>

      {bet.stake && (
        <p className="bet-stake">
          <span className="bet-stake-emoji">{bet.stake.emoji}</span>
          {bet.stake.description}
        </p>
      )}

      <div className="bet-meta">
        <span className="bet-meta-item">⏱ {formattedDate}</span>
      </div>

      {erAfventer && (
        <p className="bet-afventer-tekst">
          ◌ Venter på at {modstanderNavn} godkender
        </p>
      )}

      {erDinTur && (
        <div className="bet-handlinger">
          <button className="bet-afvis-btn" onClick={handleAfvis}>
            Afvis
          </button>
          <button className="bet-godkend-btn" onClick={handleGodkend}>
            Godkend bet →
          </button>
        </div>
      )}
    </article>
  );
}
