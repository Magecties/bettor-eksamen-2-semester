export default function SendtSkærm({ modstander, navigate }) {
  const navn = modstander?.name ?? modstander?.username ?? "modstanderen";

  return (
    <div className="sendt-side">
      <div className="sendt-indhold">
        <h1>Sendt til<br />{navn}.</h1>
        <p>
          {navn} skal godkende med et tap. Før bettet bliver aktivt. Du får besked så snart det sker.
        </p>
      </div>
      <button className="sendt-cta" onClick={() => navigate("/bets")}>
        Tilbage til feed →
      </button>
    </div>
  );
}
