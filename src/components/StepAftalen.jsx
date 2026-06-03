const hurtigeForslagListe = [
  "Jeg løber 5 km under 30 min",
  "Taberen rydder op efter festen",
  "FCK slår Brøndby på søndag",
  "Jeg består eksamen i første forsøg",
  "Næste runde betaler taberen",
  "Vinderen bestemmer restauranten",
];

export default function StepAftalen({ beskrivelse, setBeskrivelse }) {
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
            <button className="forslag-btn" onClick={() => setBeskrivelse(forslag)}>
              {forslag}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
