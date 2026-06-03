import { Routes, Route, NavLink } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import BetsPage from "./pages/BetsPage";
import "./css/App.css";

function App() {
  return (
    <>
      <nav className="main-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/bets">Bets</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bets" element={<BetsPage />} />
      </Routes>
    </>
  );
}

export default App;
