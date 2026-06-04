import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loading from "../assets/lotties/blobbo-loading.json?url";
import "../css/BlobLoader.css";

export function BlobLoader() {
  return (
    <div className="blob-loader">
      <DotLottieReact src={loading} loop autoplay className="blob-loader__anim" />
    </div>
  );
}
