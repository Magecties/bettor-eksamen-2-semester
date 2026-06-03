import { HomeTopBar } from '../components/HomePage/HomeTopBar'
import { BalanceCard } from '../components/HomePage/BalanceCard'
import { PendingCard } from '../components/HomePage/PendingCard'
import { ActiveBets } from '../components/HomePage/ActiveBets'
import '../css/HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      <HomeTopBar />
      <BalanceCard />
      <PendingCard />
      <ActiveBets />
    </div>
  )
}

export default HomePage
