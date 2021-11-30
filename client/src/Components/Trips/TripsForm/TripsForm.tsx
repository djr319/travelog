import "./TripsForm.css";
import { SyntheticEvent, useState } from "react";
import { DateRangePicker } from "rsuite";
import { useNavigate } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import tripsService from "../../../Services/trips.services";

export default function TripsForm(): JSX.Element {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState<Date[] | undefined>([]);
  // const [sights, setSights] = useState<string[]>([]);
  const [sights, setSights] = useState<string>("");

  console.log("destination", destination);

  console.log("sights", sights);
  async function postTripHandler(
    destination: string,
    dateFrom: Date,
    dateTo: Date,
    visits: string
  ) {
    return await tripsService.addNewTrip({
      destination,
      dateFrom,
      dateTo,
      visits,
    });
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!destination) {
      alert("please fill in all the fields");
      return;
    }
    console.log("dates", dates);
    if (dates && dates.length)
      postTripHandler(destination, dates[0], dates[1], sights);
    setDestination("");
    navigate("/trip", {
      state: {
        destination,
        dates: dates,
        sights,
      },
    });
  };

  return (
    <div>
      <header>Add next trip!</header>
      <div className="form-container">
        <form className="add-trip-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <div>
              <h4>Make the plan</h4>
            </div>
            {/* -----------------CITY------------------- */}
            <label>City</label>
            <input
              type="text"
              placeholder="destination..."
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            ></input>
            {/* ------------------DATES----------------------------------- */}
            <label>Dates</label>
            <h4>Departure</h4>
            <div className="dates">
              <DateRangePicker
              // onChange={(event) => {
              //   if (event.length === 2) {
              //     return setDates([event[0], event[1]]);
              //   }
              // }}
              />
            </div>
            {/* --------------TO VISIT------------------ */}
            <label>Wish List</label>
            <h4>To visit</h4>
            <div className="todo-list">
              <input
                type="text"
                value={sights}
                placeholder="wish to visit..."
                onChange={(event) => setSights(event.target.value)}
              ></input>
            </div>
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>

      <div></div>
    </div>
  );
}
