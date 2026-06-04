import { Routes, Route, Navigate, useLocation } from "react-router";
import { useAuth } from "./AuthContext";
import HomePage from "./pages/HomePage.jsx";
import BetsPage from "./pages/BetsPage";
import CreateBetPage from "./pages/CreateBetPage";
import OnboardingPage from "./pages/OnboardingPage";
import VennerPage from "./pages/VennerPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import BetDetailPage from "./pages/BetDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { BottomNav } from "./components/BottomNav";
import "./css/App.css";

const publicPaths = ["/login", "/signup", "/onboarding"];

function App() {
  const location = useLocation();
  const { session, loading } = useAuth();

  if (loading) return null;

  const onPublicPage = publicPaths.includes(location.pathname);

  if (!session && !onPublicPage) {
    // nye besøgere ser preboarding først, ellers ryger man til login
    const harSetOnboarding = localStorage.getItem("bettor_onboarded");
    return <Navigate to={harSetOnboarding ? "/login" : "/onboarding"} replace />;
  }

  if (session && (location.pathname === "/login" || location.pathname === "/signup")) {
    return <Navigate to="/" replace />;
  }

  const hideNav =
    location.pathname === "/opret" ||
    location.pathname === "/bets/opret" ||
    onPublicPage;

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/bets" element={<BetsPage />} />
        <Route path="/bets/opret" element={<CreateBetPage />} />
        <Route path="/bets/:id" element={<BetDetailPage />} />
        <Route path="/opret" element={<CreateBetPage />} />
        <Route path="/venner" element={<VennerPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<ProfileDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!hideNav && <BottomNav />}
    </>
  );
}

export default App;
