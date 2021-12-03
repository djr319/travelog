import { UserContext } from "Context";
import { useContext, useState } from "react";
import { useLocation } from "react-router";
import "./ViewProfile.css";

type ViewProfile = {
  firstname: string;
  lastname: string;
  interests: string;
};
export default function ViewProfile() {
  const [profile, setProfile] = useState<ViewProfile>({
    firstname: "",
    lastname: "",
    interests: "",
  });
  const { userName, uid, photoURL, email } = useContext(UserContext);

  const { state } = useLocation();
  if (state.firstname && state.firstname && state.interests) {
    const { firstname, lastname, interests } = state;

    return (
      <div className="profile-view-container">
        <h2 className="profile-title">Profile</h2>

        <h4>Profile picture</h4>
        <img className="profile-pic" src={photoURL} alt="" />

        <h4 className="profile-title">Email address</h4>
        <p className="profile-inputs">{email}</p>
        <h4 className="profile-title">Username</h4>
        <p className="profile-inputs">{userName}</p>
        <h4 className="profile-title">First name</h4>
        <p className="profile-inputs">{firstname}</p>
        <h4 className="profile-title">Last name</h4>
        <p className="profile-inputs">{lastname}</p>
        <h4 className="profile-title">Interests</h4>
        <p className="profile-inputs">{interests}</p>
      </div>
    );
  }
  return (
    <div className="profile-view-container">
      <h2>Profile</h2>

      <h4>Profile picture</h4>
      <img src={photoURL} alt="" />

      <h4>Email address</h4>
      <p>{email}</p>
      <h4>Username</h4>
      <p>{userName}</p>
      <h4>First name</h4>
      <p>{profile.firstname}</p>
      <h4>Last name</h4>
      <p>{profile.lastname}</p>
      <h4>Interests</h4>
      <p>{profile.interests}</p>
    </div>
  );
}
