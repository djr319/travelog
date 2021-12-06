import { UserContext } from "Context";
import { SyntheticEvent, useState, useContext, useEffect } from "react";
import profileService from "Services/profile.service";
import "./Profile.css";
import { useLocation, useNavigate } from "react-router";

export default function Profile(): JSX.Element {
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [interests, setInterests] = useState("");

  const navigate = useNavigate();

  const { state } = useLocation();
  const {
    userName,
    uid,
    photoURL: pic,
    email: userEmail,
  } = useContext(UserContext);

  useEffect(() => {
    setPhotoURL(pic);
    setUsername(userName);
    setEmail(userEmail);

    if (state && state.profile) {
      const {
        profile: { firstName, lastName, interests },
      } = state;
      setFirstname(firstName);
      setLastname(lastName);
      setInterests(interests);
    }
  }, []);

  async function postProfileHandler(
    uid: string,
    firstName: string,
    lastName: string,
    username: string,
    photoURL: string,
    email: string,
    interests: string
  ) {
    return await profileService.addProfile({
      uid,
      firstName,
      lastName,
      username,
      photoURL,
      email,
      interests,
    });
  }
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    postProfileHandler(
      uid,
      firstName,
      lastName,
      username,
      photoURL,
      email,
      interests
    );
    setPhotoURL("");
    setEmail("");
    setUsername("");
    setFirstname("");
    setLastname("");
    setInterests("");
    navigate("/Profile", {
      state: {
        firstName,
        lastName,
        interests,
      },
    });
  };
  return (
    <div className="profile-page-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2 className="profile-title">My profile</h2>
        {/* ---------------------profile picture----------- */}
        <label className="profile-label">Profile Picture</label>
        <img className="profile-img" src={photoURL} alt="" />
        {/* --------------------usename------------------- */}
        <label className="profile-label">Username</label>
        <input
          className="from-input"
          type="text"
          placeholder="username..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        {/* -------------------------email------------------ */}
        <label className="profile-label">Email address</label>
        <input
          className="from-input"
          type="text"
          placeholder="email address..."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        {/* ---------------first name------------------------ */}
        <label className="profile-label">First Name</label>
        <input
          className="from-input"
          type="text"
          placeholder="firstname..."
          value={firstName}
          onChange={(event) => setFirstname(event.target.value)}
        ></input>
        {/* ---------------last name------------------------ */}
        <label className="profile-label">Last Name</label>
        <input
          className="from-input"
          type="text"
          placeholder="lastname..."
          value={lastName}
          onChange={(event) => setLastname(event.target.value)}
        ></input>

        {/* ---------------genenal interests------------------------ */}
        <label className="profile-label">My Interests</label>
        <input
          className="from-input"
          type="text"
          placeholder="type few words about yourself..."
          value={interests}
          onChange={(event) => setInterests(event.target.value)}
        ></input>

        <button className="add-profile-button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
