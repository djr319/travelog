import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar (): JSX.Element {
	return (
		<div className='navbar'>
			<ul className='nav-select'>
				<li>
					<div>Navigation</div>
					<ul>
						<li>
							<Link to='/profile'>Profile</Link>
						</li>
						<li>
							<Link to='/trips'>Trips</Link>
						</li>
						<li>
							<Link to='/journal'>Journal</Link>
						</li>
						<li>
							<Link to='/notes'>Notes</Link>
						</li>
						<li>
							<Link to='/logout'>Logout</Link>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
}
