import "../../css/StatsRow.css";

export function StatsRow({ wins = 12, losses = 5, winRate = 71, streak = 3 }) {
  return (
    <div className="stats-row">
      <div className="stats-row__item">
        <span className="stats-row__value stats-row__value--win">{wins}</span>
        <span className="stats-row__label">Sejre</span>
      </div>

      <div className="stats-row__item">
        <span className="stats-row__value stats-row__value--loss">
          {losses}
        </span>
        <span className="stats-row__label">Nederlag</span>
      </div>

      <div className="stats-row__item">
        <span className="stats-row__value">{winRate}%</span>
        <span className="stats-row__label">Win-rate</span>
      </div>

      <div className="stats-row__item">
        <span className="stats-row__value">
          {streak} <span className="stats-row__emoji">🔥</span>
        </span>
        <span className="stats-row__label">Streak</span>
      </div>
    </div>
  );
}
