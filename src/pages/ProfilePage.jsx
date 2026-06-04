import { ProfileTopBar } from "../components/ProfilePage/ProfileTopBar";
import { ProfileHeader } from "../components/ProfilePage/ProfileHeader";
import { StatsRow } from "../components/ProfilePage/StatsRow";
import { useAuth } from "../AuthContext";
import "../css/ProfilePage.css";

function ProfilePage() {
  const { signOut } = useAuth();

  return (
    <div className="profile-page">
      <ProfileTopBar />
      <ProfileHeader />
      <StatsRow />

      <button type="button" className="profile-page__logout" onClick={signOut}>
        Log ud
      </button>
    </div>
  );
}

export default ProfilePage;
