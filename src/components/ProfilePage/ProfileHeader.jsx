import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../../css/ProfileHeader.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

const CURRENT_USER_ID = 1;

function ProfileHeader() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const query = `/users?id=eq.${CURRENT_USER_ID}&select=name,username,avatar,bio`;
      const response = await fetch(URL + query, { headers });
      const data = await response.json();
      console.log("users response:", response.status, data);
      setUser(data[0]);
    }
    getUser();
  }, []);

  if (!user) {
    return (
      <header className="profile-header">
        <p className="profile-header__loading">Indlæser…</p>
      </header>
    );
  }

  return (
    <header className="profile-header">
      <div className="profile-header__top">
        <img
          className="profile-header__avatar"
          src={user.avatar}
          alt={user.name}
        />

        <div className="profile-header__info">
          <span className="profile-header__name">{user.name}</span>
          <span className="profile-header__handle">@{user.username}</span>
        </div>

        <button
          type="button"
          className="profile-header__edit"
          onClick={() => navigate("/profile/edit")}
        >
          Rediger
        </button>
      </div>

      {user.bio && <p className="profile-header__bio">{user.bio}</p>}
    </header>
  );
}

export default ProfileHeader;
