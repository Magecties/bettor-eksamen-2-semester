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
  const hideNav = location.pathname === "/bets/opret";

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bets" element={<BetsPage />} />
        <Route path="/bets/opret" element={<CreateBetPage />} />
      </Routes>

      {!hideNav && <BottomNav />}
    </>
  );
}

export default App;
