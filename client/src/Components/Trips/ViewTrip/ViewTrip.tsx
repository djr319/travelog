import "./ViewTrip.css";
import { useLocation } from "react-router-dom";

export default function ViewPersonalTrip(): JSX.Element {
  const { state } = useLocation();
  console.log(state);
  const { destination, dates, sights } = state;
  return (
    <div className="trip_view-container">
      <h6>{destination}</h6>
      <h6>{dates[0]}</h6>
      <h6>{dates[1]}</h6>
      <div>{sights}</div>
    </div>
  );
}
