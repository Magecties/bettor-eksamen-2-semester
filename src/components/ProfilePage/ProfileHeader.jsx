import { useNavigate } from "react-router";
import "../../css/ProfileHeader.css";

function ProfileHeader({
  name = "Mathias Madsen",
  handle = "@mathias",
  avatarUrl = "https://i.pravatar.cc/150?img=12",
}) {
  const navigate = useNavigate();

  return (
    <header className="profile-header">
      <img className="profile-header__avatar" src={avatarUrl} alt={name} />

      <div className="profile-header__info">
        <span className="profile-header__name">{name}</span>
        <span className="profile-header__handle">{handle}</span>
      </div>

      <button
        type="button"
        className="profile-header__edit"
        onClick={() => navigate("/profile/edit")}
      >
        Rediger
      </button>
    </header>
  );
}

export default ProfileHeader;
