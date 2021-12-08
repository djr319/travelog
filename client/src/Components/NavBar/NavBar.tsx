import { Link } from "react-router-dom";
import { GrMapLocation, GrBook, GrNotes, GrChat, GrSun } from "react-icons/gr";
// import { base, deepMerge } from 'grommet-icons'; rquired to edit colors
import "./NavBar.css";

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
      <ul className="nav-select">
        <li data-md-tooltip="Trips">
          <Link to="/trips"><GrMapLocation /></Link>
        </li>

        <li data-md-tooltip="Journal">
          <Link to="/journal"><GrBook /></Link>
        </li>

        <li data-md-tooltip="Notes">
          <Link to='/notes'><GrNotes /></Link>
        </li>

        <li data-md-tooltip="Chat">
          <Link to='/chat'><GrChat /></Link>
        </li>

        <li data-md-tooltip="Weather">
          <Link to='/weather'><GrSun /></Link>
        </li>
      </ul >
    </div >
    // </ThemeContext.Provider>
  );
}
