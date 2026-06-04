import { Routes, Route, useLocation } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import BetsPage from "./pages/BetsPage";
import CreateBetPage from "./pages/CreateBetPage";
import VennerPage from "./pages/VennerPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import { BottomNav } from "./components/BottomNav";
import "./css/App.css";

function App() {
  const location = useLocation();
  const hideNav = location.pathname === "/opret";

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bets" element={<BetsPage />} />
        <Route path="/opret" element={<CreateBetPage />} />
        <Route path="/venner" element={<VennerPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<ProfileDetailPage />} />
      </Routes>

      {!hideNav && <BottomNav />}
    </>
  );
}

export default App;
