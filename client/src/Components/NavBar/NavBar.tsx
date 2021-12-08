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
    // </ThemeContext.Provider>
  );
}
