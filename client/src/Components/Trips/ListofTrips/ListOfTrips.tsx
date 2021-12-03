import { useState } from "react";
import PersonalTrip from "../PersonalTrip/PersonalTrip";
import "./ListOfTrips.css";
import { Link } from "react-router-dom";

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
    id: "string",
    destination: "Rome",
    dateFrom: "Monday",
    dateTo: "Friday",
    visits: "string",
    createdAt: "string",
  },
  {
    id: "string",
    destination: "Rome",
    dateFrom: "Monday",
    dateTo: "Friday",
    visits: "string",
    createdAt: "string",
  },
];

export default function ListOfTrips(): JSX.Element {
  const [trips, setTrips] = useState(mockTrips);
  return (
      <div className='list-container'>
        {trips.length ? (
          trips.map((trip) => (
            <PersonalTrip trip={trip} setTrips={setTrips} key={trip.id} />
          ))
        ) : (
          <p>Time to plan your first trip!</p>
        )}
      <Link to='/trips-form'>
        <div className="book empty">Add trip</div>
      </Link>
      </div>

  );
}
