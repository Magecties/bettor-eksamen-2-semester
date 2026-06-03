export default function BetCard({ bet }) {
  const formattedDate = new Date(bet.created_at).toLocaleString("da-DK", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const modstander = bet.participants?.find((p) => p.role === "counterparty");
  const modstanderNavn = modstander?.user?.name ?? modstander?.user?.username ?? "?";

  return (
    <article className="bet-card">
      <div className="bet-card-content">
        <div className="bet-card-top">
          <p className="bet-players">
            Dig <span>mod</span> {modstanderNavn}
          </p>
          <span className="bet-badge">{bet.status}</span>
        </div>
        <h2>{bet.description}</h2>
        {bet.stake && (
          <p className="bet-stake">
            <span className="bet-stake-emoji">{bet.stake.emoji}</span>
            {bet.stake.description}
          </p>
        )}
        <p className="bet-meta">
          <span className="bet-meta-icon">⏱</span>
          <time className="bet-time" dateTime={bet.created_at}>
            {formattedDate}
          </time>
        </p>
      </div>
    </article>
  );
}
