import { Link } from "react-router";
import "../css/NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1 className="not-found__code">404</h1>
      <p className="not-found__text">
        Hov, det var vidst ikke en side :)
      </p>
      <Link to="/" className="not-found__link" aria-label="Tilbage til hjem">
        ←
      </Link>
    </div>
  );
}

export default NotFoundPage;
