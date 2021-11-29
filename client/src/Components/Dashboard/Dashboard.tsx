import './Dashboard.css';

const Dashboard = (): JSX.Element => {
	return (
		<div className='dashboard'>
			<div>Get the magic from your trips in an easy way</div>
			<div className='preview-pictures-container'>
				<img
					className='preview-pictures'
					alt='showing what the app contains'
					src='../mock-app-pick1.jpeg'
				/>
				<img
					className='preview-pictures'
					alt='showing what the app contains'
					src='../mock-app-pic2.jpeg'
				/>
				<img
					className='preview-pictures'
					alt='showing what the app contains'
					src='../mock-app-pic3.jpeg'
				/>
			</div>
			<div className='sign-in-buttons'>
				<button className='sign-up'>Sign up</button>
				<button className='log-in'>Log In</button>
			</div>
		</div>
	);
};

export default Dashboard;
