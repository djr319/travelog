import { SyntheticEvent, useState } from "react";
import profileService from "Services/profile.service";
import "./Profile.css";

export default function Profile(): JSX.Element {
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [interests, setInterests] = useState("");

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
  };
  return (
    <div className="profile-page-container" onSubmit={handleSubmit}>
      <form className="profile-form">
        <h3>My profile</h3>
        {/* --------------------usename------------------- */}
        <label>Username</label>
        <input
          type="text"
          placeholder="username..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        {/* ---------------------profile picture----------- */}
        <label>Profile Picture</label>
        <input
          type="text"
          placeholder="picture..."
          value={picture}
          onChange={(event) => setPicture(event.target.value)}
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
