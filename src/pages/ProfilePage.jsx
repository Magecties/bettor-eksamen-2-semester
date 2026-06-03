import { ProfileTopBar } from "../components/ProfilePage/ProfileTopBar";
import { ProfileHeader } from "../components/ProfilePage/ProfileHeader";
import { StatsRow } from "../components/ProfilePage/StatsRow";
import "../css/ProfilePage.css";

function ProfilePage() {
  return (
    <div className="profile-page">
      <ProfileTopBar />
      <ProfileHeader />
      <StatsRow />
    </div>
  );
}

export default ProfilePage;
