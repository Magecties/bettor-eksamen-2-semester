import { useState } from "react";
import { useNavigate } from "react-router";
import "../css/ProfileDetailPage.css";

function ProfileDetailPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("Mathias Madsen");
  const [handle, setHandle] = useState("@mathias");
  const [avatarUrl, setAvatarUrl] = useState(
    "https://i.pravatar.cc/150?img=12"
  );
  const [bio, setBio] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
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
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
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
          <span>Handle</span>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
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
