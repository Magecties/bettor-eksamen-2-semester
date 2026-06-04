import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../AuthContext";
import "../css/ProfileDetailPage.css";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

function ProfileDetailPage() {
  const { profile } = useAuth();
  if (!profile) return null;
  return <ProfileDetailForm profile={profile} />;
}

function ProfileDetailForm({ profile }) {
  const navigate = useNavigate();

  const [name, setName] = useState(profile.name ?? "");
  const [username, setUsername] = useState(profile.username ?? "");
  const [avatar, setAvatar] = useState(profile.avatar ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");

  async function handleSubmit(event) {
    event.preventDefault();

    await fetch(URL + `/users?id=eq.${profile.id}`, {
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
