import "./ViewTrip.css";
import { useLocation, useParams } from "react-router-dom";
// import tripsService, { getOnePersonalTrip } from "Services/trips.services";
import { useState } from "react";
import { Trip } from "../ListofTrips/ListOfTrips";
import format from "date-fns/format";

export default function ViewPersonalTrip(): JSX.Element {
  const { id } = useParams();

  const [trip, setTrip] = useState<Trip>();

  // na valw useEffect me call sto getOnePersonalTrip(id) me to id ws parametro
  // gia na parw to trip kai meta antika8istw ta hardcoded values me
  // trip.destination trip.dateTo trip.dateFrom etc..

  const { state } = useLocation();
  if (state.dateRange) {
    const { destination, dateRange, visits } = state;
    return (
      <div className="trip_view-container">
        <h6>{destination}</h6>
        <h6>{format(dateRange.startDate, "Do MMM yyyy")}</h6>
        <h6>{format(dateRange.endDate, "Do MMM yyyy")}</h6>
        <div>{visits}</div>
      </div>
    );
  }

  return (
    <div className="trip_view-container">
      <h6>{"destination"}</h6>
      <h6>{"JSON.stringify(dateRange.startDate)"}</h6>
      <h6>{"JSON.stringify(dateRange.endDate)"}</h6>
      <div>{"visits"}</div>
    </div>
  );
}
