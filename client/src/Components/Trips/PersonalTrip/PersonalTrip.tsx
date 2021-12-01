import { Link } from "react-router-dom";

type TripProps = {
  trip: { id: string; destination: string; dateFrom: string; dateTo: string };
};

const PersonalTrip = (props: TripProps): JSX.Element => {
  const { id, destination, dateFrom, dateTo } = props.trip;
  // const deleteHandler = async () => {
  //   await tripsService.deleteOnePersonalTrip(trip.id);
  //   setTrip((prev) =>
  //     prev.filter((notDeletedTrip) => notDeletedTrip._id !== trip.id)
  //   );
  //   setFilteredTrip((prev) =>
  //     prev.filter((notDeletedTrip) => notDeletedTrip._id !== trip.id)
  //   );
  // };

  return (
    <div>
      <img>Book</img>
      <Link to={`/viewTrip/${id}`} state={props.trip}>
        <p>{`${destination} & ${dateFrom}-${dateTo}`}</p>
      </Link>
      {/* ---------------------DELETE----------------------------- */}
      {/* <div className="trip_delete">
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
      </div> */}
    </div>
  );
};

export default PersonalTrip;
