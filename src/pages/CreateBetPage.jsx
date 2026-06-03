import { useState } from "react";
import { useNavigate } from "react-router";
import "../css/create-bet.css";

export default function CreateBetPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const totalSteps = 4;

  const stepLabels = {
    1: "MODSTANDER",
    2: "AFTALEN",
    3: "INDSATS",
    4: "BEKRÆFT",
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

  const ctaLabels = {
    1: "Næste — vælg aftale →",
    2: "Næste — vælg indsats →",
    3: "Gennemse bettet →",
    4: "Send til modstander →",
  };

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
        {step === 1 && <StepModstander />}
        {step === 2 && <StepAftalen />}
        {step === 3 && <StepIndsats />}
        {step === 4 && <StepBekraeft />}
      </div>

      <div className="create-bet-footer">
        {step > 1 && (
          <button className="create-bet-back" onClick={handleBack}>
            ← Tilbage
          </button>
        )}
        <button className="create-bet-cta" onClick={handleNext}>
          {ctaLabels[step]}
        </button>
      </div>
    </div>
  );
}

function StepModstander() {
  return (
    <div>
      <h1>
        Hvem vædder <em>du</em> med?
      </h1>
      <p className="create-bet-subtitle">
        Vælg en ven — eller en hel gruppe, hvor alle kan tage imod bettet.
      </p>
    </div>
  );
}

function StepAftalen() {
  return (
    <div>
      <h1>
        Hvad er <em>aftalen?</em>
      </h1>
      <p className="create-bet-subtitle">
        Skriv det — eller sig det højt. Din formulering låses, så ingen kan vide sig udenom senere.
      </p>
    </div>
  );
}

function StepIndsats() {
  return (
    <div>
      <h1>Hvad er på spil?</h1>
      <p className="create-bet-subtitle">
        Ikke kun penge — gør indsatsen personlig. Det er det, der gør det sjovt.
      </p>
    </div>
  );
}

function StepBekraeft() {
  return (
    <div>
      <h1>Klar til at sende?</h1>
      <p className="create-bet-subtitle">
        Sådan ser bettet ud. Tjek det — så sender vi det til godkendelse.
      </p>
    </div>
  );
}
