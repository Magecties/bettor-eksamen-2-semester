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

  const initial = (name || username || "?").charAt(0).toUpperCase();

  return (
    <div className="profile-detail">
      <div className="profile-detail__topbar">
        <button
          type="button"
          className="profile-detail__back"
          aria-label="Tilbage"
          onClick={() => navigate("/profile")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="profile-detail__title">Rediger profil</h1>
        <span className="profile-detail__spacer" />
      </div>

      <div className="profile-detail__avatar-wrap">
        {avatar ? (
          <img src={avatar} alt={name} className="profile-detail__avatar" />
        ) : (
          <div className="profile-detail__avatar profile-detail__avatar--placeholder">
            {initial}
          </div>
        )}
      </div>

      <form className="profile-detail__form" onSubmit={handleSubmit}>
        <label className="profile-detail__field">
          <span>Avatar URL</span>
          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://…"
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
            placeholder="Fortæl lidt om dig selv"
          />
        </label>

        <div className="profile-detail__actions">
          <button
            type="button"
            className="profile-detail__cancel"
            onClick={() => navigate("/profile")}
          >
            Annuller
          </button>
          <button type="submit" className="profile-detail__save">
            Gem
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileDetailPage;
