import { useNavigate } from "react-router";
import "../../css/ActiveBetCard.css";

export function ActiveBetCard({ id, opponentName, description, emoji, createdAt }) {
  const navigate = useNavigate();
  const initial = opponentName ? opponentName.charAt(0).toUpperCase() : "?";

  const created = new Date(createdAt);
  const now = new Date();
  const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
  let dateText = "";
  if (diffDays === 0) dateText = "i dag";
  else if (diffDays === 1) dateText = "i går";
  else dateText = "for " + diffDays + " dage siden";

  return (
    <article
      className="active-bet-card"
      onClick={() => id && navigate(`/bets/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="active-bet-card__avatar">{initial}</div>

      <div className="active-bet-card__info">
        <h3 className="active-bet-card__title">{description}</h3>
        <div className="active-bet-card__meta">
          <span className="active-bet-card__pill">
            <span className="active-bet-card__dot" />
            Aktiv
          </span>
          <span className="active-bet-card__date">· {dateText}</span>
        </div>
      </div>

      {emoji && (
        <div className="active-bet-card__stake">
          <span>{emoji}</span>
        </div>
      )}
    </article>
  );
}
