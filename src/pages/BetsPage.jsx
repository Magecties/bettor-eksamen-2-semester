import { useEffect, useState } from "react";
import BetCard from "../components/BetCard";

const URL = import.meta.env.VITE_SUPABASE_URL; // .../rest/v1
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function BetsPage() {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    async function getBets() {
      const query =
        "/bets?select=*,creator:users(username,name,avatar),stake:stakes(*)&order=created_at.desc";
      const response = await fetch(URL + query, { headers });
      const data = await response.json();
      setBets(data);
    }
    getBets();
  }, []);

  return (
    <>
      <header className="bets-page-header">
        <h1>Alle bets</h1>
      </header>
      <main>
        <section className="bets-grid" aria-label="Alle bets">
          {bets.map((bet) => (
            <BetCard key={bet.id} bet={bet} />
          ))}
        </section>
      </main>
    </>
  );
}