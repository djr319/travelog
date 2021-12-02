import { Link } from "react-router-dom";
import "./NavBar.css";
// import Login from '../../Components/LoginButton/LoginButton';

// TODO
// <li>Profile</li>
// <li>Planning</li>
// <li>Trips</li>
// <li>Journal</li>
// <li>Notes</li>
// <li>Route</li>
// <li>Weather</li>
// <li>Logout</li>

export default function NavBar(): JSX.Element {
  return (
    <div className="navbar">
      <div className="navbar-circle" />
      <div className="nav-select">
        <ul className="nav-select__list">
          <li>
            <div>Navigation</div>
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/trips">Trips</Link>
              </li>
              <li>
                <Link to="/journal">Journal</Link>
              </li>
              {/* <li>
                <Link to='/notes'>Notes</Link>
              </li> */}
              {/* <li>
                <Link to='/logout'>Logout</Link>
              </li> */}
              {/* <li>
                <Login />
              </li> */}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
