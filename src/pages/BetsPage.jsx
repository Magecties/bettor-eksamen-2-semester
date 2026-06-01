import { useEffect, useState } from "react";

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
    <main>
      {bets.map((bet) => (
        <article key={bet.id}>
          <h2>{bet.description}</h2>
          <p>Status: {bet.status}</p>
          <p>Oprettet af: {bet.creator?.name ?? bet.creator?.username}</p>
          {bet.stake && (
            <p>Indsats: {bet.stake.emoji} {bet.stake.description}</p>
          )}
        </article>
      ))}
    </main>
  );
}