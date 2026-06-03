import { Routes, Route, NavLink, useLocation } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import BetsPage from "./pages/BetsPage";
import CreateBetPage from "./pages/CreateBetPage";
import "./css/App.css";

function App() {
  const location = useLocation();
  const hideNav = location.pathname === "/bets/opret";

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
      </Routes>
    </>
  );
}

export default App;
