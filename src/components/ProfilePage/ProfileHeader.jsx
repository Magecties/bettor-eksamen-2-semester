import { useNavigate } from "react-router";
import { useAuth } from "../../AuthContext";
import "../../css/ProfileHeader.css";

export function ProfileHeader() {
  const navigate = useNavigate();
  const { profile: user } = useAuth();

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
