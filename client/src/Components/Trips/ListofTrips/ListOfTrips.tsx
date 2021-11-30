import PersonalTrip from "../ViewTrip/ViewTrip";
import "./ListOfTrips.css";
type Trip = {
  id: string;
  destination: string;
  dateFrom: string;
  dateTo: string;
  visit: string;
  createdAt: string;
};
const ListOfTrips = ({ trips }: { trips: Trip[] }): JSX.Element => {
  const tripsList =
    trips.length && trips.map((trip) => <PersonalTrip key={trip.id} />);
  return (
    <div>
      <ul className="list-container">
        {tripsList && tripsList.length ? (
          tripsList
        ) : (
          <p>there no trips planned yet</p>
        )}
      </ul>
      <button>Add Trip</button>
    </div>
  );
};
export default ListOfTrips;
