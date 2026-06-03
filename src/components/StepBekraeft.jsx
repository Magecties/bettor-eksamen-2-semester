export default function StepBekraeft({ modstander, beskrivelse, indsats }) {
  const modstanderNavn = modstander?.name ?? modstander?.username ?? "?";

  return (
    <div>
      <h1>Klar til at sende?</h1>
      <p className="create-bet-subtitle">
        Sådan ser bettet ud. Tjek det — så sender vi det til godkendelse.
      </p>

      <div className="bekraeft-kort">
        <div className="bekraeft-spillere">
          <div className="bekraeft-avatar">D</div>
          <span className="bekraeft-mod">mod</span>
          <div className="bekraeft-avatar">
            {modstander?.avatar ? (
              <img src={modstander.avatar} alt={modstanderNavn} />
            ) : (
              modstanderNavn[0].toUpperCase()
            )}
          </div>
          <span className="bekraeft-navn">{modstanderNavn}</span>
        </div>

        <p className="bekraeft-beskrivelse">"{beskrivelse}"</p>

        {indsats && (
          <div className="bekraeft-indsats">
            <span>{indsats.emoji}</span>
            <span>{indsats.description}</span>
          </div>
        )}

        <p className="bekraeft-note">
          <span>○</span> Begge skal sige ja. {modstanderNavn} skal godkende med et tap. Du får besked så snart det sker.
        </p>

        <p className="bekraeft-status">Status: afventer godkendelse</p>
      </div>
    </div>
  );
}
