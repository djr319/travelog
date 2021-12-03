import { UserContext } from "Context";
import { SyntheticEvent, useState, useContext, useEffect } from "react";
import profileService from "Services/profile.service";
<<<<<<< HEAD
import "./profile.css";
=======
import "./Profile.css";
import { useNavigate } from "react-router";
>>>>>>> dev

export default function Profile(): JSX.Element {
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [interests, setInterests] = useState("");

  const navigate = useNavigate();

  const { userName, uid, photoURL, email: userEmail } = useContext(UserContext);

  useEffect(() => {
    setPicture(photoURL);
    setUsername(userName);
    setEmail(userEmail);
  }, []);

  async function postProfileHandler(
    picture: string,
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    interests: string
  ) {
    return await profileService.addNewProfile({
      picture,
      email,
      username,
      firstname,
      lastname,
      interests,
    });
  }
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    postProfileHandler(
      picture,
      email,
      username,
      firstname,
      lastname,
      interests
    );
    setPicture("");
    setEmail("");
    setUsername("");
    setFirstname("");
    setLastname("");
    setInterests("");
    navigate("/viewProfile", {
      state: {
        firstname,
        lastname,
        interests,
      },
    });
  };
  return (
    <div className="profile-page-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h3>My profile</h3>
        {/* ---------------------profile picture----------- */}
        <label>Profile Picture</label>
        <img src={picture} alt="" />
        {/* --------------------usename------------------- */}
        <label>Username</label>
        <input
          type="text"
          placeholder="username..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        {/* -------------------------email------------------ */}
        <label>Email address</label>
        <input
          type="text"
          placeholder="email address..."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        {/* ---------------first name------------------------ */}
        <label>First Name</label>
        <input
          type="text"
          placeholder="firstname..."
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
        ></input>
        {/* ---------------last name------------------------ */}
        <label>Last Name</label>
        <input
          type="text"
          placeholder="lastname..."
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
        ></input>

        {/* ---------------genenal interests------------------------ */}
        <label>My Interests</label>
        <input
          type="text"
          placeholder="type few words about yourself..."
          value={interests}
          onChange={(event) => setInterests(event.target.value)}
        ></input>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
