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
      <h2>Trip Summary</h2>
      <table>
        <tr>
          <td>Destination:</td>
          <td className="bold">{trip?.city}</td>
        </tr>
        <tr>
          <td>From:</td>
          <td className="bold">{moment(trip?.dateFrom).format("MMMM Do YYYY")}</td>
        </tr>
        <tr>
          <td>To:</td>
          <td className="bold">{moment(trip?.dateTo).format("MMMM Do YYYY")}</td>
        </tr>
        <tr>
          <td>Plan:</td><td></td>
        </tr>
        <tr>
          <td className="bold" colSpan={2 }>{trip?.visit}</td>
        </tr>
    </table>
      <div className="button-group">
      < button className="button"  onClick={() => navigate("/trips")}>
        Back
      </button>
      < button className="button"  onClick={() => navigate("/form", { state: { trip } })}>
        Update
        </button>
        </div>
    </div>
  );
}
