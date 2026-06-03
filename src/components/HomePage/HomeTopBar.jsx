import { useEffect, useState } from "react";
import "../../css/HomeTopBar.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

const CURRENT_USER_ID = 1;

export function HomeTopBar() {
  const [name, setName] = useState("");

  useEffect(() => {
    async function getUser() {
      const query = `/users?id=eq.${CURRENT_USER_ID}&select=name`;
      const response = await fetch(URL + query, { headers });
      const data = await response.json();
      setName(data[0].name);
    }
    getUser();
  }, []);

  return (
    <div className="home-topbar">
      <h1 className="home-topbar__title">Hej {name}</h1>

      <div className="home-topbar__actions">
        <button type="button" className="home-topbar__btn" aria-label="Notifikationer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        <button type="button" className="home-topbar__btn" aria-label="Søg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
