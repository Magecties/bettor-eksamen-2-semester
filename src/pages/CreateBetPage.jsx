import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../css/create-bet.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function CreateBetPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [modstander, setModstander] = useState(null);
  const [beskrivelse, setBeskrivelse] = useState("");
  const [indsats, setIndsats] = useState(null);

  const totalSteps = 4;

  const stepLabels = {
    1: "MODSTANDER",
    2: "AFTALEN",
    3: "INDSATS",
    4: "BEKRÆFT",
  };

  const ctaLabels = {
    1: "Næste — vælg aftale →",
    2: "Næste — vælg indsats →",
    3: "Gennemse bettet →",
    4: "Send til modstander →",
  };

  const canProceed = {
    1: modstander !== null,
    2: beskrivelse.trim().length > 0,
    3: indsats !== null,
    4: true,
  };

  function handleNext() {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  }

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  return (
    <div className="create-bet-page">
      <div className="create-bet-header">
        <button className="create-bet-close" onClick={() => navigate("/bets")}>
          ✕
        </button>
        <span className="create-bet-step-count">
          {String(step).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
        </span>
        <p className="create-bet-step-label">TRIN {step} · {stepLabels[step]}</p>
      </div>

      <div className="create-bet-body">
        {step === 1 && (
          <StepModstander modstander={modstander} setModstander={setModstander} />
        )}
        {step === 2 && (
          <StepAftalen beskrivelse={beskrivelse} setBeskrivelse={setBeskrivelse} />
        )}
        {step === 3 && (
          <StepIndsats indsats={indsats} setIndsats={setIndsats} />
        )}
        {step === 4 && (
          <StepBekraeft modstander={modstander} beskrivelse={beskrivelse} indsats={indsats} />
        )}
      </div>

      <div className="create-bet-footer">
        {step > 1 && (
          <button className="create-bet-back" onClick={handleBack}>
            ← Tilbage
          </button>
        )}
        <button
          className="create-bet-cta"
          onClick={handleNext}
          disabled={!canProceed[step]}
        >
          {ctaLabels[step]}
        </button>
      </div>
    </div>
  );
}

function StepModstander({ modstander, setModstander }) {
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
          const navn = item.name ?? item.username ?? item.name;
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

const hurtigeForslagListe = [
  "Jeg løber 5 km under 30 min",
  "Taberen rydder op efter festen",
  "FCK slår Brøndby på søndag",
  "Jeg består eksamen i første forsøg",
  "Næste runde betaler taberen",
  "Vinderen bestemmer restauranten",
];

function StepAftalen({ beskrivelse, setBeskrivelse }) {
  return (
    <div>
      <h1>
        Hvad er <em>aftalen?</em>
      </h1>
      <p className="create-bet-subtitle">
        Skriv det — eller sig det højt. Din formulering låses, så ingen kan vide sig udenom senere.
      </p>

      <textarea
        className="aftalen-input"
        placeholder="Jeg løber 5 km på under 25 min inden søndag"
        value={beskrivelse}
        onChange={(e) => setBeskrivelse(e.target.value)}
        rows={4}
        maxLength={280}
      />
      <p className="aftalen-tæller">{beskrivelse.length}/280</p>

      <p className="squad-label">Hurtige forslag</p>
      <ul className="forslag-liste">
        {hurtigeForslagListe.map((forslag) => (
          <li key={forslag}>
            <button
              className="forslag-btn"
              onClick={() => setBeskrivelse(forslag)}
            >
              {forslag}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const deadlineValg = ["I aften", "I morgen", "På søndag", "Om en uge"];

function StepIndsats({ indsats, setIndsats }) {
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

function StepBekraeft({ modstander, beskrivelse, indsats }) {
  return (
    <div>
      <h1>Klar til at sende?</h1>
      <p className="create-bet-subtitle">
        Sådan ser bettet ud. Tjek det — så sender vi det til godkendelse.
      </p>
    </div>
  );
}
