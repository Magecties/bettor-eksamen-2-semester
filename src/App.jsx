import { Routes, Route, NavLink } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import BetsPage from "./pages/BetsPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import "./css/App.css";

function App() {
  return (
    <>
      <nav className="main-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/bets">Bets</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bets" element={<BetsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<ProfileDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
