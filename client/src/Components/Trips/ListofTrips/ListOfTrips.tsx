import { useContext, useEffect, useState } from "react";
import PersonalTrip from "../PersonalTrip/PersonalTrip";
import "./ListOfTrips.css";
import { Link } from "react-router-dom";
import { Trip } from "Types";
import tripsService from "Services/trips.service";
import { UserContext } from "Context";

export default function ListOfTrips(): JSX.Element {
  const [trips, setTrips] = useState<Trip[]>([]);
  const { uid } = useContext(UserContext);

  const getTripsHandler = async (userId: string) => {
    const { plans } = await tripsService.getAllPersonalTrips(userId);

    const sortedTrips = plans.sort((a, b) => {
      const tripA = new Date(a.dateFrom).getTime();
      const tripB = new Date(b.dateFrom).getTime();
      return tripB - tripA;
    });

    setTrips(sortedTrips);
  };

  useEffect(() => {
    getTripsHandler(uid);
  }, []);

  return (
    <div className="list-container">
      {trips && trips.length ? (
        trips.map((trip) => (
          <PersonalTrip trip={trip} setTrips={setTrips} key={trip.id} />
        ))
      ) : (
        <p>Time to plan your first trip!</p>
      )}
      <Link to="/form">
        <button>Add trip</button>
      </Link>
    </div>
  );
}
