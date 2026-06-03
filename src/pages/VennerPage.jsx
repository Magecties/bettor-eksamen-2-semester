import { useState } from "react";
import { VennerTopBar } from "../components/VennerPage/VennerTopBar";
import { FriendCard } from "../components/VennerPage/FriendCard";
import "../css/VennerPage.css";

const owesYou = [
  { name: "Sebastian Holm", subtitle: "1 aktivt bet · sidst i går", count: 1, emoji: "☕" },
  { name: "Anna Lykke", subtitle: "1 aktivt bet · afgøres fredag", count: 2, emoji: "🍺" },
  { name: "Jonas Brandt", subtitle: "1 afgjort · indfri lørdag", count: 1, emoji: "🧽" },
];

const youOwe = [
  { name: "Lukas Munk", subtitle: "1 aktivt bet", count: 1, emoji: "🍕" },
  { name: "Kristian Vinter", subtitle: "1 aktivt bet · afgjort tirsdag", count: 1, emoji: "☕" },
];

function VennerPage() {
  const [tab, setTab] = useState("venner");

  return (
    <div className="venner-page">
      <VennerTopBar />

      <div className="venner-page__tabs">
        <button
          type="button"
          className={tab === "venner" ? "venner-page__tab venner-page__tab--active" : "venner-page__tab"}
          onClick={() => setTab("venner")}
        >
          Venner
        </button>
        <button
          type="button"
          className={tab === "grupper" ? "venner-page__tab venner-page__tab--active" : "venner-page__tab"}
          onClick={() => setTab("grupper")}
        >
          Grupper
        </button>
      </div>

      {tab === "venner" && (
        <div className="venner-page__list">
          <h2 className="venner-page__section">
            <span className="venner-page__dot venner-page__dot--positive" />
            Skylder dig · {owesYou.length} stk
          </h2>
          {owesYou.map((friend) => (
            <FriendCard key={friend.name} {...friend} direction="positive" />
          ))}

          <h2 className="venner-page__section">
            <span className="venner-page__dot venner-page__dot--negative" />
            Du skylder · {youOwe.length} stk
          </h2>
          {youOwe.map((friend) => (
            <FriendCard key={friend.name} {...friend} direction="negative" />
          ))}
        </div>
      )}

      {tab === "grupper" && (
        <div className="venner-page__empty">
          <p>Ingen grupper endnu.</p>
        </div>
      )}
    </div>
  );
}

export default VennerPage;
