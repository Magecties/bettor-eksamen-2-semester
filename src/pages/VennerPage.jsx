import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { VennerTopBar } from "../components/VennerPage/VennerTopBar";
import { FriendCard } from "../components/VennerPage/FriendCard";
import "../css/VennerPage.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

function VennerPage() {
  const { profile } = useAuth();
  const [tab, setTab] = useState("venner");
  const [users, setUsers] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!profile?.id) return;

    async function getUsers() {
      const query = `/users?id=neq.${profile.id}&select=id,name,username,avatar&order=name.asc`;
      const res = await fetch(URL + query, { headers });
      const data = await res.json();
      setUsers(data);
    }

    async function getMyParticipations() {
      const query = `/bet_participants?user_id=eq.${profile.id}&select=bet:bets(id,status,bet_participants(user_id,is_winner),stake:stakes(emoji,amount))`;
      const res = await fetch(URL + query, { headers });
      const data = await res.json();
      setParticipants(data);
    }

    getUsers();
    getMyParticipations();
  }, [profile?.id]);

  function getStatus(friendId) {
    let active = 0;
    let owesYou = 0;
    let youOwe = 0;

    for (const row of participants) {
      const bet = row.bet;
      if (!bet) continue;
      const friendInBet = bet.bet_participants?.find((p) => p.user_id === friendId);
      if (!friendInBet) continue;

      if (bet.status === "active") {
        active++;
      } else if (bet.status === "resolved") {
        const me = bet.bet_participants?.find((p) => p.user_id === profile.id);
        if (me?.is_winner === true && friendInBet.is_winner === false) {
          owesYou += bet.stake?.amount ?? 1;
        } else if (me?.is_winner === false && friendInBet.is_winner === true) {
          youOwe += bet.stake?.amount ?? 1;
        }
      }
    }

    return { active, owesYou, youOwe };
  }

  return (
    <div className="venner-page">
      <VennerTopBar />

      <div className="venner-page__tabs">
        <button
          type="button"
          className={tab === "venner" ? "venner-page__tab venner-page__tab--active" : "venner-page__tab"}
          onClick={() => setTab("venner")}
        >
          Venner
        </button>
        <button
          type="button"
          className={tab === "grupper" ? "venner-page__tab venner-page__tab--active" : "venner-page__tab"}
          onClick={() => setTab("grupper")}
        >
          Grupper
        </button>
      </div>

      {tab === "venner" && (
        <div className="venner-page__list">
          {users.length === 0 && (
            <p className="venner-page__empty-text">Ingen brugere endnu.</p>
          )}
          {users.map((friend) => {
            const status = getStatus(friend.id);
            let subtitle = "Ingen åbne bets";
            if (status.active > 0) {
              subtitle = status.active === 1 ? "1 aktivt bet" : status.active + " aktive bets";
            } else if (status.owesYou > 0) {
              subtitle = "Skylder dig " + status.owesYou;
            } else if (status.youOwe > 0) {
              subtitle = "Du skylder " + status.youOwe;
            }
            return (
              <FriendCard
                key={friend.id}
                name={friend.name ?? friend.username}
                subtitle={"@" + friend.username + " · " + subtitle}
              />
            );
          })}
        </div>
      )}

      {tab === "grupper" && (
        <div className="venner-page__empty">
          <p>Ingen grupper endnu.</p>
        </div>
      )}
    </div>
  );
}

export default VennerPage;
