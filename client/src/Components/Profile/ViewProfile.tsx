import { UserContext } from "Context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import profileService from "Services/profile.service";
import "./ViewProfile.css";
import { Profile } from "Types";

const mockProfile = {
  uid: "",
  photoURL: "",
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  interests: "",
};
export default function ViewProfile(): JSX.Element {
  const [profile, setProfile] = useState<Profile>(mockProfile);
  const { userName, uid, photoURL, email } = useContext(UserContext);

  const navigate = useNavigate();

  const getProfileHandler = async (uid: string) => {
    const profile = await profileService.getProfile(uid);
    setProfile(profile);
  };
  useEffect(() => {
    getProfileHandler(uid);
  }, []);
  // const { state } = useLocation();

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
      <p>{profile.firstName}</p>
      <h4>Last name</h4>
      <p>{profile.lastName}</p>
      <h4>Interests</h4>
      <p>{profile.interests}</p>

      <button
        onClick={() =>
          navigate("/updateProfile", {
            state: {
              profile,
            },
          })
        }
      >
        Update
      </button>
    </div>
  );
}
