import { Routes, Route, NavLink } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import './App.css'

function App() {
  return (
    <>
      <nav className="main-nav">
        <NavLink to="/">Home</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
