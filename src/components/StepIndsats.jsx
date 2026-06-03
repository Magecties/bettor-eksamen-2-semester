import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

const deadlineValg = ["I aften", "I morgen", "På søndag", "Om en uge"];

export default function StepIndsats({ indsats, setIndsats }) {
  const [templates, setTemplates] = useState([]);
  const [deadline, setDeadline] = useState(null);

  useEffect(() => {
    async function hentTemplates() {
      const response = await fetch(
        URL + "/stake_templates?owner_id=is.null&select=*&order=id.asc",
        { headers }
      );
      const data = await response.json();
      setTemplates(data);
    }
    hentTemplates();
  }, []);

  function vælgIndsats(template) {
    if (indsats?.id === template.id) {
      setIndsats(null);
    } else {
      setIndsats({ ...template, deadline });
    }
  }

  function vælgDeadline(valg) {
    setDeadline(valg);
    if (indsats) {
      setIndsats({ ...indsats, deadline: valg });
    }
  }

  return (
    <div>
      <h1>Hvad er på spil?</h1>
      <p className="create-bet-subtitle">
        Ikke kun penge — gør indsatsen personlig. Det er det, der gør det sjovt.
      </p>

      <div className="indsats-grid">
        {templates.map((t) => (
          <button
            key={t.id}
            className={`indsats-kort ${indsats?.id === t.id ? "valgt" : ""}`}
            onClick={() => vælgIndsats(t)}
          >
            <span className="indsats-emoji">{t.emoji}</span>
            <span className="indsats-navn">{t.description}</span>
          </button>
        ))}
      </div>

      <p className="squad-label" style={{ marginTop: "28px" }}>Deadline</p>
      <div className="deadline-valg">
        {deadlineValg.map((valg) => (
          <button
            key={valg}
            className={`deadline-btn ${deadline === valg ? "aktiv" : ""}`}
            onClick={() => vælgDeadline(valg)}
          >
            {valg}
          </button>
        ))}
      </div>
    </div>
  );
}
