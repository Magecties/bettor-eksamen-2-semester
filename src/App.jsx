import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import BetsPage from "./pages/BetsPage";
import CreateBetPage from "./pages/CreateBetPage";
import OnboardingPage from "./pages/OnboardingPage";
import VennerPage from "./pages/VennerPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import { BottomNav } from "./components/BottomNav";
import "./css/App.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNav =
    location.pathname === "/bets/opret" ||
    location.pathname === "/opret" ||
    location.pathname === "/onboarding";

  // send nye besøgende ind i preboarding-flowet første gang
  useEffect(() => {
    const harSetOnboarding = localStorage.getItem("bettor_onboarded");
    if (!harSetOnboarding && location.pathname !== "/onboarding") {
      navigate("/onboarding");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bets" element={<BetsPage />} />
        <Route path="/bets/opret" element={<CreateBetPage />} />
        <Route path="/opret" element={<CreateBetPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/venner" element={<VennerPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<ProfileDetailPage />} />
      </Routes>

      {!hideNav && <BottomNav />}
    </>
  );
}

export default App;
