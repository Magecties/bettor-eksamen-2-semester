import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import splash from "../assets/lotties/blobbo-splash.json?url";
import "../css/Splash.css";

export function Splash() {
  return (
    <div className="splash">
      <DotLottieReact src={splash} loop autoplay className="splash__anim" />
    </div>
  );
}
