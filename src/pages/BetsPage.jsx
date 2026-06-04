import { useEffect, useState } from "react";
import BetCard from "../components/BetCard";
import "../css/bets-page.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

const CREATOR_ID = 1;

export default function BetsPage() {
  const [bets, setBets] = useState([]);
  const [soeg, setSoeg] = useState("");
  const [filter, setFilter] = useState("alle");
  const [sortering, setSortering] = useState("seneste");

  useEffect(() => {
    async function getBets() {
      const query =
        "/bets?select=*,creator:users(username,name,avatar),participants:bet_participants(*,user:users(username,name,avatar)),stake:stakes(*)&order=created_at.desc";
      const response = await fetch(URL + query, { headers });
      const data = await response.json();
      setBets(data);
    }
    getBets();
  }, []);

  const dinTurBets = bets.filter((b) => {
    const deltager = b.participants?.find((p) => p.user_id === CREATOR_ID);
    return deltager?.role === "counterparty" && deltager?.acceptance === "pending";
  });

  const aktiveBets = bets.filter((b) => b.status === "active");

  const afventerBets = bets.filter((b) => {
    const deltager = b.participants?.find((p) => p.user_id === CREATOR_ID);
    return deltager?.role === "creator" && b.status === "pending";
  });

  const filtreret = bets.filter((b) => {
    if (filter === "din-tur") return dinTurBets.includes(b);
    if (filter === "aktive") return aktiveBets.includes(b);
    if (filter === "afventer") return afventerBets.includes(b);
    return true;
  }).filter((b) => {
    if (!soeg) return true;
    const modstander = b.participants?.find((p) => p.role === "counterparty");
    const navn = modstander?.user?.name ?? modstander?.user?.username ?? "";
    return (
      b.description?.toLowerCase().includes(soeg.toLowerCase()) ||
      navn.toLowerCase().includes(soeg.toLowerCase())
    );
  });

  return (
    <div className="bets-page">
      <header className="bets-page-header">
        <div>
          <h1>Alle bets</h1>
          <p>{bets.length} bets i alt · {aktiveBets.length} kører lige nu</p>
        </div>
      </header>

      <div className="bets-soeg">
        <span className="bets-soeg-ikon">🔍</span>
        <input
          type="text"
          placeholder="Søg i bets, personer, indsatser..."
          value={soeg}
          onChange={(e) => setSoeg(e.target.value)}
        />
      </div>

      <div className="bets-tabs">
        {["seneste", "deadline", "person"].map((s) => (
          <button
            key={s}
            className={`bets-tab ${sortering === s ? "aktiv" : ""}`}
            onClick={() => setSortering(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="bets-filtre">
        <button className={`filter-pill ${filter === "alle" ? "aktiv" : ""}`} onClick={() => setFilter("alle")}>
          Alle <span className="filter-pill-antal">{bets.length}</span>
        </button>
        <button className={`filter-pill ${filter === "din-tur" ? "aktiv" : ""}`} onClick={() => setFilter("din-tur")}>
          Din tur <span className="filter-pill-antal">{dinTurBets.length}</span>
        </button>
        <button className={`filter-pill ${filter === "aktive" ? "aktiv" : ""}`} onClick={() => setFilter("aktive")}>
          Aktive <span className="filter-pill-antal">{aktiveBets.length}</span>
        </button>
        <button className={`filter-pill ${filter === "afventer" ? "aktiv" : ""}`} onClick={() => setFilter("afventer")}>
          Afventer <span className="filter-pill-antal">{afventerBets.length}</span>
        </button>
      </div>

      <p className="bets-sektion-label">Denne uge {filtreret.length}</p>

      <section className="bets-grid" aria-label="Alle bets">
        {filtreret.map((bet) => (
          <BetCard key={bet.id} bet={bet} creatorId={CREATOR_ID} />
        ))}
      </section>
    </div>
  );
}
