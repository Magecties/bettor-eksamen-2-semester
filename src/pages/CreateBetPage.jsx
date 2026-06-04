import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../AuthContext";
import StepModstander from "../components/StepModstander";
import StepAftalen from "../components/StepAftalen";
import StepIndsats from "../components/StepIndsats";
import StepBekraeft from "../components/StepBekraeft";
import SendtSkærm from "../components/SendtSkærm";
import "../css/create-bet.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function CreateBetPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [step, setStep] = useState(1);
  const [sendt, setSendt] = useState(false);
  const [sender, setSender] = useState(false);

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
    4: `Send til ${modstander?.name ?? modstander?.username ?? "modstander"} →`,
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

  async function handleSend() {
    setSender(true);

    const betResponse = await fetch(URL + "/bets", {
      method: "POST",
      headers: { ...headers, Prefer: "return=representation" },
      body: JSON.stringify({
        creator_id: profile.id,
        description: beskrivelse,
        status: "pending",
      }),
    });
    const betData = await betResponse.json();
    const betId = betData[0].id;

    await fetch(URL + "/bet_participants", {
      method: "POST",
      headers,
      body: JSON.stringify([
        { bet_id: betId, user_id: profile.id, role: "creator", acceptance: "accepted" },
        { bet_id: betId, user_id: modstander.id, role: "counterparty", acceptance: "pending" },
      ]),
    });

    await fetch(URL + "/stakes", {
      method: "POST",
      headers,
      body: JSON.stringify({
        bet_id: betId,
        description: indsats.description,
        emoji: indsats.emoji,
        kind: indsats.kind,
      }),
    });

    setSender(false);
    setSendt(true);
  }

  if (sendt) {
    return <SendtSkærm modstander={modstander} navigate={navigate} />;
  }

  return (
    <div className="create-bet-page">
      <div className="create-bet-header">
        <button className="create-bet-close" onClick={() => navigate("/")}>
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
          onClick={step === totalSteps ? handleSend : handleNext}
          disabled={!canProceed[step] || sender}
        >
          {sender ? "Sender..." : ctaLabels[step]}
        </button>
      </div>
    </div>
  );
}
