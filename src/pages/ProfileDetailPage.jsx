import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../css/ProfileDetailPage.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

const CURRENT_USER_ID = 1;

function ProfileDetailPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    async function getUser() {
      const query = `/users?id=eq.${CURRENT_USER_ID}&select=name,username,avatar,bio`;
      const response = await fetch(URL + query, { headers });
      const data = await response.json();
      const user = data[0];
      setName(user.name);
      setUsername(user.username);
      setAvatar(user.avatar);
      setBio(user.bio);
    }
    getUser();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    await fetch(URL + `/users?id=eq.${CURRENT_USER_ID}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ name, username, avatar, bio }),
    });

    navigate("/profile");
  }

  return (
    <div className="profile-detail">
      <h1>Rediger profil</h1>

      <form className="profile-detail__form" onSubmit={handleSubmit}>
        <label className="profile-detail__field">
          <span>Avatar URL</span>
          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </label>

        <label className="profile-detail__field">
          <span>Navn</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="profile-detail__field">
          <span>Brugernavn</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="profile-detail__field">
          <span>Bio</span>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>

        <div className="profile-detail__actions">
          <button type="button" onClick={() => navigate("/profile")}>
            Annuller
          </button>
          <button type="submit">Gem</button>
        </div>
      </form>
    </div>
  );
}

export default ProfileDetailPage;
