import { Link } from "react-router-dom";
import { GrMapLocation, GrBook, GrNotes, GrChat, GrSun } from "react-icons/gr";
// import { ThemeProvider } from 'styled-components';
// import { base, deepMerge } from 'grommet-icons';
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
// GrChatOption

// https://react-icons.github.io/react-icons/icons?name=gr

// const theme = deepMerge(base, {
//   global: {
//     colors: {
//       brand: '#ff0000',
//     },
//   },
// });

export default function NavBar(): JSX.Element {
  return (
    // <ThemeContext.Provider theme={theme}>
    <div className="navbar">

      <div className="nav-select">
        <ul className="nav-select__list">
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
          <Link to='/chat'><GrChat /></Link>
          </li>
          <li>
          <Link to='/weather'><GrSun/></Link>
          </li>
        </ul >
      </div >
    </div >
    // </ThemeContext.Provider>
  );
}
