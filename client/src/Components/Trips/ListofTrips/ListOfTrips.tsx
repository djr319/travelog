import { Dispatch, SetStateAction, useState } from 'react';
import PersonalTrip from '../PersonalTrip/PersonalTrip';
import './ListOfTrips.css';
import { Link } from 'react-router-dom';

export type Trip = {
	id: string;
	destination: string;
	dateFrom: string;
	dateTo: string;
	visits: string;
	createdAt: string;
};

const mockTrips: Trip[] = [
	{
		id: 'string',
		destination: 'Rome',
		dateFrom: 'Monday',
		dateTo: 'Friday',
		visits: 'string',
		createdAt: 'string'
	},
	{
		id: 'string',
		destination: 'Rome',
		dateFrom: 'Monday',
		dateTo: 'Friday',
		visits: 'string',
		createdAt: 'string'
	}
];

export default function ListOfTrips (): JSX.Element {
	const [ trips, setTrips ] = useState(mockTrips);
	return (
		<h4>
			<ul className='list-container'>
				{trips.map((trip) => (
					<PersonalTrip trip={trip} setTrips={setTrips} key={trip.id} />
				)) ? (
					trips
				) : (
					<p>there no trips planned yet</p>
				)}
			</ul>

			<Link to='/form'>Add Trip</Link>
		</h4>
	);
}
