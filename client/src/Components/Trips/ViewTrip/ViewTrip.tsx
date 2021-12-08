import "./ViewTrip.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Trip } from "Types";
import { UserContext } from "Context";

export default function ViewPersonalTrip(): JSX.Element {
  const [trip, setTrip] = useState<Trip>();
  const navigate = useNavigate();
  const { uid } = useContext(UserContext);
  const { state } = useLocation();

  useEffect(() => {
    setTrip(state);
  }, []);

  if (state.dateRange && trip === undefined) {
    const { city, dateRange, visit } = state;
    setTrip({
      uid,
      id: "",
      city,
      dateFrom: dateRange.startDate,
      dateTo: dateRange.endDate,
      visit,
    });
    return (
      <div className="trip_view-container">
        <h6>{city}</h6>
        <h6>{moment(dateRange.startDate).format("MMM Do YY")}</h6>
        <h6>{moment(dateRange.endDate).format("MMM Do YY")}</h6>
        <div>{visit}</div>
      </div>
    );
  }

  return (
    <div className="view-trip">
      <h3>Destination:</h3>
      <p>{trip?.city}</p>
      <h3>From:</h3>
        <p>{moment(trip?.dateFrom).format("MMM Do YY")}</p>
      <h3>To:</h3>
        <p>{moment(trip?.dateTo).format("MMM Do YY")}</p>

      <h3>Plan:</h3>
      <div>{trip?.visit}</div>

      <button onClick={() => navigate("/trips")}>
        Back
      </button>

      <button onClick={() => navigate("/form", { state: { trip } })}>
        Update
      </button>
    </div>
  );
}
