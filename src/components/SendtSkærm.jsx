import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import emojiExplosion from "../assets/lotties/emoji-explosion.json?url";
import aftaleLaast from "../assets/lotties/blobbo-aftale-laast.json?url";

export default function SendtSkærm({ modstander, navigate }) {
  const navn = modstander?.name ?? modstander?.username ?? "modstanderen";

  return (
    <div className="sendt-side">
      <DotLottieReact
        src={emojiExplosion}
        autoplay
        className="sendt-blast"
      />
      <div className="sendt-indhold">
        <DotLottieReact
          src={aftaleLaast}
          loop
          autoplay
          className="sendt-blob"
        />
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
