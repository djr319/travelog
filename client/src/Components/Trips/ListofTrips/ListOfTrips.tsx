import { Dispatch, SetStateAction } from "react";
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

const ListOfTrips = ({
  trips,
  setTrips,
}: {
  trips: Trip[];
  setTrips: Dispatch<SetStateAction<Trip[]>>;
}): JSX.Element => {
  const tripsList =
    trips.length &&
    trips.map((trip) => {
      const personalTripProps = { trip: trip, setTrips };
      return <PersonalTrip {...personalTripProps} key={trip.id} />;
    });
  return (
    <h4>
      <ul className="list-container">
        {tripsList && tripsList.length ? (
          tripsList
        ) : (
          <p>there no trips planned yet</p>
        )}
      </ul>

      <Link to="/form">Add Trip</Link>
    </h4>
  );
};
export default ListOfTrips;
