import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import tripsService from "../../../Services/trips.services";
import { Trip } from "../ListofTrips/ListOfTrips";

type TripProps = {
  trip: Trip;
  setTrips: Dispatch<SetStateAction<Trip[]>>;
};

const PersonalTrip = (props: TripProps): JSX.Element => {
  const { id, destination, dateFrom, dateTo } = props.trip;

  const deleteHandler = async () => {
    await tripsService.deleteOnePersonalTrip(props.trip.id);
    props.setTrips((prev) =>
      prev.filter((notDeletedTrip: Trip) => notDeletedTrip.id !== props.trip.id)
    );
  };

  return (
    <div>
      {/* <img></img> */}
      <Link to={`/trip/${id}`} state={props.trip}>
        <p>{`${destination} & ${dateFrom}-${dateTo}`}</p>
      </Link>
      {/* ---------------------DELETE----------------------------- */}
      <div className="trip_delete">
        <button
          className="delete_btn"
          onClick={() => {
            if (window.confirm("Are you sure you wish to delete this trip?"))
              deleteHandler();
          }}
        >
          <span role="img" aria-label="delete-button" className="delete-button">
            ❌
          </span>
        </button>
      </div>
    </div>
  );
};

export default PersonalTrip;
