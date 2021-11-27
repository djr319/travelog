import { Link, BrowserRouter } from 'react-router-dom';
import './NavBar.css';


export default function NavBar (): JSX.Element {
	return (
		<div className='navbar'>
      <BrowserRouter>
			<nav className="nav-select">
        <li>Navigation</li>
				<li><Link to="/profile">Profile</Link></li>
				<li><Link to="/trips">Trips</Link></li>
				<li><Link to="/journal">Journal</Link></li>
				<li><Link to="/notes">Notes</Link></li>
				<li><Link to="/logout">Logout</Link></li>
			</nav>
      </BrowserRouter>
		</div>
	);
}
