import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function StepModstander({ modstander, setModstander }) {
  const [type, setType] = useState("person");
  const [soeg, setSoeg] = useState("");
  const [brugere, setBrugere] = useState([]);
  const [grupper, setGrupper] = useState([]);

  useEffect(() => {
    async function hentBrugere() {
      const response = await fetch(
        URL + "/users?select=id,username,name,avatar&order=name.asc",
        { headers }
      );
      const data = await response.json();
      setBrugere(data);
    }
    hentBrugere();
  }, []);

  useEffect(() => {
    async function hentGrupper() {
      const response = await fetch(
        URL + "/groups?select=id,name,avatar&archived=eq.false&order=name.asc",
        { headers }
      );
      const data = await response.json();
      setGrupper(data);
    }
    hentGrupper();
  }, []);

  const filtreretBrugere = brugere.filter((b) =>
    (b.name ?? b.username).toLowerCase().includes(soeg.toLowerCase())
  );

  const filtreretGrupper = grupper.filter((g) =>
    g.name.toLowerCase().includes(soeg.toLowerCase())
  );

  const liste = type === "person" ? filtreretBrugere : filtreretGrupper;

  function vælg(item) {
    if (modstander?.id === item.id && modstander?.type === type) {
      setModstander(null);
    } else {
      setModstander({ ...item, type });
    }
  }

  return (
    <div>
      <h1>
        Hvem vædder <em>du</em> med?
      </h1>
      <p className="create-bet-subtitle">
        Vælg en ven — eller en hel gruppe, hvor alle kan tage imod bettet.
      </p>

      <div className="type-toggle">
        <button
          className={type === "person" ? "active" : ""}
          onClick={() => { setType("person"); setModstander(null); }}
        >
          Person
        </button>
        <button
          className={type === "gruppe" ? "active" : ""}
          onClick={() => { setType("gruppe"); setModstander(null); }}
        >
          Gruppe
        </button>
      </div>

      <input
        className="soeg-input"
        type="text"
        placeholder={type === "person" ? "Søg efter ven..." : "Søg efter gruppe..."}
        value={soeg}
        onChange={(e) => setSoeg(e.target.value)}
      />

      <p className="squad-label">DIT SQUAD</p>

      <ul className="bruger-liste">
        {liste.map((item) => {
          const navn = item.name ?? item.username;
          const under = item.username ? "@" + item.username : "";
          const valgt = modstander?.id === item.id && modstander?.type === type;

          return (
            <li
              key={item.id}
              className={`bruger-item ${valgt ? "valgt" : ""}`}
              onClick={() => vælg(item)}
            >
              <div className="bruger-avatar">
                {item.avatar ? (
                  <img src={item.avatar} alt={navn} />
                ) : (
                  <span>{(navn?.[0] ?? "?").toUpperCase()}</span>
                )}
              </div>
              <div className="bruger-info">
                <span className="bruger-navn">{navn}</span>
                {under && <span className="bruger-username">{under}</span>}
              </div>
              {valgt && <span className="bruger-check">✓</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
