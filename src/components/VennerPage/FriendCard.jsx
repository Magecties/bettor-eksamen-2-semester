import "../../css/FriendCard.css";

export function FriendCard({ name, subtitle, count, emoji, direction }) {
  const initial = name.charAt(0).toUpperCase();
  const isPositive = direction === "positive";

  return (
    <article className="friend-card">
      <div className="friend-card__avatar">{initial}</div>

      <div className="friend-card__info">
        <span className="friend-card__name">{name}</span>
        <span className="friend-card__subtitle">{subtitle}</span>
      </div>

      <div className="friend-card__stake">
        <span className="friend-card__count">
          {count} <span className="friend-card__emoji">{emoji}</span>
        </span>
        <span
          className={
            isPositive
              ? "friend-card__direction friend-card__direction--positive"
              : "friend-card__direction friend-card__direction--negative"
          }
        >
          {isPositive ? "+ DU" : "− DU"}
        </span>
      </div>
    </article>
  );
}
