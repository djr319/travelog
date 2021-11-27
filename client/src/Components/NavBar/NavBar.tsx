export default function NavBar (): JSX.Element {
	return (
		<div className='navbar'>
			<select id="nav-select">
        <option value="">Navigation</option>
				<option value="profile">Profile</option>
				<option value="trips">Trips</option>
				<option value="journal">Journal</option>
				<option value="notes">Notes</option>
				<option value="logout">Logout</option>
			</select>
		</div>
	);
}
