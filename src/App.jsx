import { useEffect } from "react";
import { Routes, Route, NavLink, useLocation, useNavigate } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import BetsPage from "./pages/BetsPage";
import CreateBetPage from "./pages/CreateBetPage";
import OnboardingPage from "./pages/OnboardingPage";
import "./css/App.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNav =
    location.pathname === "/bets/opret" || location.pathname === "/onboarding";

  // send nye besøgende ind i preboarding-flowet første gang
  useEffect(() => {
    const harSetOnboarding = localStorage.getItem("bettor_onboarded");
    if (!harSetOnboarding && location.pathname !== "/onboarding") {
      navigate("/onboarding");
    }
  }, []);

  return (
    <>
      {!hideNav && (
        <nav className="main-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/bets">Bets</NavLink>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bets" element={<BetsPage />} />
        <Route path="/bets/opret" element={<CreateBetPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </>
  );
}

export default App;
