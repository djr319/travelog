import "./TripsForm.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import tripsService from "Services/trips.service";
import "react-quill/dist/quill.snow.css";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";

import { UserContext } from "Context";
import { useContext } from "react";

function TripsForm(): JSX.Element {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [city, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [visit, setVisits] = useState([""]);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { uid, userName } = useContext(UserContext);

  useEffect(() => {
    if (state && state.trip) {
      const { city, visit, dateFrom, dateTo } = state.trip;
      setDestination(city);
      setVisits(visit);
      setDateRange({
        startDate: dateFrom,
        endDate: dateTo,
      });
    }
  }, []);
  async function postTripHandler(
    uid: string,
    city: string,
    dateFrom: Date,
    dateTo: Date,
    visit: string[],
    users: string
  ) {
    return await tripsService.addNewTrip({
      uid,
      city,
      dateFrom,
      dateTo,
      visit,
      users,
    });
  }

  async function updateTripHandler(
    id: string,
    uid: string,
    city: string,
    dateFrom: Date,
    dateTo: Date,
    visit: string[]
  ) {
    return await tripsService.updateTrip(id, {
      uid,
      city,
      dateFrom,
      dateTo,
      visit,
    });
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!city) {
      alert("please fill  in all the fields");
      return;
    }

    if (dateRange.startDate && dateRange.endDate) {
      if (!state) {
        postTripHandler(
          uid,
          city,
          dateRange.startDate,
          dateRange.endDate,
          visit,
          userName
        );
      } else {
        updateTripHandler(
          state.trip.id,
          uid,
          city,
          dateRange.startDate,
          dateRange.endDate,
          visit
        );
      }
      setDestination("");
      navigate("/trip", {
        state: {
          city,
          dateRange,
          visit,
          userName,
        },
      });
    }
  };

  return (
    <div className="form-container">
      <h3>Add next trip!</h3>

      <form className="add-trip-form" onSubmit={handleSubmit}>
        {/* -----------------CITY------------------- */}
        <label>City</label>
        <input
          type="text"
          placeholder="destination..."
          value={city}
          onChange={(event) => setDestination(event.target.value)}
        ></input>
        {/* ------------------DATES----------------------------------- */}
        <label>Dates</label>
        <h4>Departure</h4>

        <div>
          <DateRangePicker
            wrapperClassName="dates"
            open={isOpen}
            toggle={toggle}
            onChange={(range) => setDateRange(range)}
          />
          <div
            className="button-dates"
            aria-label="toggle dates button"
            onClick={toggle}
          >
            {isOpen ? "Close" : "Set Dates"}
          </div>
        </div>
        {/* --------------TO VISIT------------------ */}
        <label>Wish List</label>

        <textarea
          className="trips_form-textarea"
          placeholder="Enter review description..."
          required={true}
          name="review"
          value={visit}
          onChange={(event) => setVisits([event.target.value])}
        />

        <button className="sendButton" type="submit">
          {state ? "Update" : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default TripsForm;
