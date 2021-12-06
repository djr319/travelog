import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "Context";
import logo from "Assets/logo/travelog.png";
// import './header.css'

function dropDown() {
  document.getElementById("myDropdown")!.classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  const thisTarget = event.target as HTMLElement;

  if (!thisTarget.matches(".profile-image")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

export default function Header(): JSX.Element {
  const { photoURL } = useContext(UserContext);

  return (
    <header className="header">
      <div className="dropdown">
        <div className="navbar-circle" onClick={dropDown}>
          <img
            className="profile-image"
            src={photoURL}
            alt="user profile picture"
          />
        </div>

        <div id="myDropdown" className="dropdown-content">
          <Link to="/profile">Profile</Link>
          <a href="#">Logout (TODO)</a>{" "}
          {/* <a onClick={() => auth.signOut()}> */}
        </div>
      </div>

      <div className="logo-container">
        <Link to="/">
          <img src={logo} className="logo" alt="Travelog logo" />
        </Link>
      </div>
    </header>
  );
}
