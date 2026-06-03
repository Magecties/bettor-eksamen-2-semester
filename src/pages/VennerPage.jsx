import { useState } from "react";
import { VennerTopBar } from "../components/VennerPage/VennerTopBar";
import "../css/VennerPage.css";

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
    </div>
  );
}

export default VennerPage;
