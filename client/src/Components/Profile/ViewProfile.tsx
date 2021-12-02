import { Profile } from "Types";

export default function ViewProfile({
  picture,
  email,
  username,
  firstname,
  lastname,
  interests,
}: Profile) {
  return (
    <div className="profile-view-container">
      <h2>Profile</h2>

      <h4>Profile picture</h4>
      <p>{picture}</p>
      <h4>Email address</h4>
      <p>{email}</p>
      <h4>Username</h4>
      <p>{username}</p>
      <h4>First name</h4>
      <p>{firstname}</p>
      <h4>Last name</h4>
      <p>{lastname}</p>
      <h4>Interests</h4>
      <p>{interests}</p>
    </div>
  );
}
