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

  return (
    <div className="profile">
      <h2>Profile</h2>
      <img src={photoURL} alt="profile-picture" />

      <table>
        <tr>
          <td>Username:</td>
          <td className="bold">{userName}</td>
        </tr>
        <tr>
          <td>Email address:</td>
          <td className="bold">{email}</td>
        </tr>
        <tr>
          <td>First name:</td>
          <td className="bold">{profile.firstName}</td>
        </tr>
        <tr>
          <td>Last name:</td>
          <td className="bold">{profile.lastName}</td>
        </tr>
        <tr>
          <td colSpan={2}>Interests:</td>
        </tr>
        <tr>
          <td className="bold" colSpan={2}>{profile.interests}</td>
        </tr>
    </table>
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
