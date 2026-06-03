export default function BetCard({ bet }) {
  const formattedDate = new Date(bet.created_at).toLocaleString("da-DK", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <article className="bet-card">
      <div className="bet-card-content">
        <time className="bet-time" dateTime={bet.created_at}>
          {formattedDate}
        </time>
        <h2>{bet.description}</h2>
        {bet.stake && (
          <p className="bet-stake">
            <span className="bet-stake-emoji">{bet.stake.emoji}</span>
            {bet.stake.description}
          </p>
        )}
        <p className="bet-status">{bet.status}</p>
      </div>
    </article>
  );
}
