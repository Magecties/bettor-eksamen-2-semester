import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../css/onboarding.css";

const totalSteps = 5;

const ctaLabels = {
  1: "Vis mig hvordan →",
  2: "Næste →",
  3: "Næste →",
  4: "Næste →",
  5: "Kom i gang →",
};

// data til de små lister/chips så JSX'en bliver pænere
const lockTrin = ["1. Sig det", "2. Vælg indsats", "3. Lock"];

const skyldnere = [
  { initial: "M", farve: "mathias", navn: "Mathias skylder øl", note: "Sig løbet han på under 25 min" },
  { initial: "S", farve: "sofie", navn: "Sofie skylder kaffe", note: "Sig drikker ikke kaffe i en uge" },
];

const indsatser = [
  { emoji: "🍺", navn: "En øl" },
  { emoji: "☕", navn: "Kaffe i en uge" },
  { emoji: "🧽", navn: "Opvask" },
  { emoji: "😳", navn: "Pinlig story", highlight: true },
  { emoji: "💸", navn: "50 kr" },
  { emoji: "+", navn: "Selvvalgt" },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState(8);

  // lille nedtælling på trin 2 — kører i loop så det altid er i bevægelse
  useEffect(() => {
    if (step !== 2) return;
    setTimer(8);
    const id = setInterval(() => {
      setTimer((t) => (t <= 0 ? 8 : t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [step]);

  function handleNext() {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function afslut() {
    localStorage.setItem("bettor_onboarded", "true");
    navigate("/signup");
  }

  // sidste skærm — gul afslutning
  if (done) {
    return (
      <div className="onboarding-done">
        <div className="onboarding-done-indhold">
          <span className="onboarding-done-emoji" role="img" aria-label="håndtryk">
            🤝
          </span>
          <h1>
            Du er<br />inde.
          </h1>
          <p>Nu skal vi bare have nogle venner at presse.</p>
        </div>
        <button className="onboarding-done-cta" onClick={afslut}>
          Kom igang!
        </button>
      </div>
    );
  }

  return (
    <div className="onboarding-page">
      <header className="onboarding-header">
        {step > 1 ? (
          <button className="onboarding-back" onClick={handleBack} aria-label="Tilbage">
            ←
          </button>
        ) : (
          <span />
        )}
        <span className="onboarding-stepcount">
          {String(step).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
        </span>
      </header>

      {/* key={step} gør at indholdet animeres ind på ny hver gang vi skifter trin */}
      <div className="onboarding-body" key={step}>
        {step === 1 && (
          <div className="onboarding-trin onboarding-trin-1">
            <svg className="onboarding-logo" viewBox="0 0 100 80" aria-hidden="true">
              <path d="M50 18 C 32 30 28 48 38 66" />
              <path d="M50 18 C 68 30 72 48 62 66" />
            </svg>
            <p className="onboarding-eyebrow">Velkommen til Bettor</p>
            <h1 className="onboarding-title">Ingen kan gemme sig.</h1>
            <p className="onboarding-text">
              Bettor låser jeres aftaler fast. Sagt er sagt — også i morgen.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-trin">
            <p className="onboarding-timer">
              0:{String(timer).padStart(2, "0")}
            </p>
            <h1 className="onboarding-title">
              Lav et bet <em>før øllen er tom.</em>
            </h1>
            <p className="onboarding-text">
              Tre tap. Otte sekunder. Aftalen er låst, før nogen når at fortryde.
            </p>
            <div className="onboarding-chips">
              {lockTrin.map((t) => (
                <span className="onboarding-chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-trin">
            <span className="onboarding-badge rod">🔥 2 prøver at slippe</span>
            <h1 className="onboarding-title">
              Hold dem <em>accountable.</em>
            </h1>
            <p className="onboarding-text">
              Når en ven prøver at glemme aftalen, kan du spamme dem til de leverer. Helt seriøst.
            </p>
            <ul className="onboarding-list">
              {skyldnere.map((s) => (
                <li className="onboarding-list-item" key={s.navn}>
                  <span className={`onboarding-list-avatar ${s.farve}`}>{s.initial}</span>
                  <span className="onboarding-list-tekst">
                    <span className="onboarding-list-navn">{s.navn}</span>
                    <span className="onboarding-list-note">{s.note}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="onboarding-spam">
              <span className="onboarding-spam-tekst">
                <strong>SPAM DINE VENNER</strong>
                Tryk for at sende en bøge af emojis
              </span>
              <span className="onboarding-spam-knap">🔔 spam</span>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="onboarding-trin">
            <h1 className="onboarding-title">
              Penge er <em>kedeligt.</em>
            </h1>
            <p className="onboarding-text">
              Sæt øl, opvask, en tjeneste eller en pinlig story på spil. Indsatsen er din.
            </p>
            <div className="onboarding-grid">
              {indsatser.map((i) => (
                <span
                  className={`onboarding-grid-item ${i.highlight ? "highlight" : ""}`}
                  key={i.navn}
                >
                  <span className="onboarding-grid-emoji">{i.emoji}</span>
                  {i.navn}
                </span>
              ))}
            </div>
            <p className="onboarding-protip">
              💡 <strong>Pro tip:</strong> appen er kun sjov med dine venner. Inviter dem som det første.
            </p>
          </div>
        )}

        {step === 5 && (
          <div className="onboarding-trin">
            <span className="onboarding-badge gul">⚡ Du er næsten inde</span>
            <h1 className="onboarding-title">
              Klar til at <em>miste venner?</em>
            </h1>
            <p className="onboarding-text">
              Bare for sjov. Mest. Lav din profil og inviter din første gruppe.
            </p>
            <p className="onboarding-protip">
              💡 <strong>Pro tip:</strong> de første bets sidder bedst med folk du ser tit.
            </p>
          </div>
        )}
      </div>

      <div className="onboarding-dots" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`onboarding-dot ${step === n ? "aktiv" : ""}`} />
        ))}
      </div>

      <div className="onboarding-footer">
        <button className="onboarding-cta" onClick={handleNext}>
          {ctaLabels[step]}
        </button>
      </div>
    </div>
  );
}
