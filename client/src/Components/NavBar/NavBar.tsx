import { Link } from "react-router-dom";
import { GrHome, GrUser, GrMapLocation, GrBook, GrNotes, GrLogout } from "react-icons/gr";
import { ThemeProvider } from 'styled-components';
import { base, deepMerge } from 'grommet-icons';
import logo from 'Assets/logo.jpg';
import "./NavBar.css";
// import Login from '../../Components/LoginButton/LoginButton';

// TODO
// <li>Profile</li> < />
// <li>Planning</li>GrCompliance GrPlan

// <li>Notes</li>
// <li>Route</li>GrMapLocation
// <li>Weather</li>

// GrCamera
// GrNavigate
// GrCatalogOption
// GrChatOption
// GrChat
// GrImage


// <div className="navbar">
// <div className="navbar-circle" />
// <div className="nav-select">
//   <ul className="nav-select__list">
//     <li>
//       <div className="title">Navigation</div>
//       <ul>
//         <li>
//           <Link to="/">Dashboard</Link>
//         </li>
//         {/* <li>
//           <Link to='/profile'>Profile</Link>
//         </li> */}
//         <li>
//           <Link to="/trips">Trips</Link>
//         </li>
//         <li>
//           <Link to="/journal">Journal</Link>
//         </li>
//         {/* <li>
//           <Link to='/notes'>Notes</Link>
//         </li> */}
//         {/* <li>
//           <Link to='/logout'>Logout</Link>
//         </li> */}
//         {/* <li>
//           <Login />
//         </li> */}
//       </ul>
//     </li>
//   </ul>
// </div>
// </div>
// );
// GrChatOption

// https://react-icons.github.io/react-icons/icons?name=gr

const theme = deepMerge(base, {
  global: {
    colors: {
      brand: '#ff0000',
    },
  },
});


export default function NavBar(): JSX.Element {
  return (
    <ThemeContext.Provider theme={theme}>
      <div className="navbar">
        {/* <div className="navbar-circle">

      </div> */}
        <Link to="/">
          <img src={logo} className="logo" alt="Travelog logo" />
        </Link>
        <div className="nav-select">
          <ul className="nav-select__list">
            <li>
              <Link to='/profile'><GrUser /></Link>
            </li>
            <li>
              <Link to="/trips"><GrMapLocation /></Link>
            </li>
            <li>
              <Link to="/journal"><GrBook /></Link>
            </li>
            <li>
              <Link to='/notes'><GrNotes /></Link>
            </li>
            <li>
              <GrLogout />
            </li>
          </ul>
        </div >
      </div >
    </ThemeContext.Provider>
  );
}

