import { Routes, Route, Navigate, useLocation } from "react-router";
import { useAuth } from "./AuthContext";
import HomePage from "./pages/HomePage.jsx";
import BetsPage from "./pages/BetsPage";
import CreateBetPage from "./pages/CreateBetPage";
import VennerPage from "./pages/VennerPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { BottomNav } from "./components/BottomNav";
import "./css/App.css";

function App() {
  const location = useLocation();
  const { session, loading } = useAuth();

  if (loading) return null;

  const onAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  if (!session && !onAuthPage) {
    return <Navigate to="/login" replace />;
  }

  if (session && onAuthPage) {
    return <Navigate to="/" replace />;
  }

  const hideNav = location.pathname === "/opret" || onAuthPage;

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
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
