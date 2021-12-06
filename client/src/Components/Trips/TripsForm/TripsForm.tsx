import "./TripsForm.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import tripsService from "Services/trips.service";
// import ReactQuill from "react-quill";
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

  // const handleTextEditor = (e: string) => {
  //   setVisits(e);
  // };

  return (
    <div className="form-container">
      <h1>Add next trip!</h1>

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
            value={city}
            onChange={(event) => setDestination(event.target.value)}
          ></input>
          {/* ------------------DATES----------------------------------- */}
          <label>Dates</label>
          <h4>Departure</h4>
          <div style={{}}>
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
          {/* --------option1---------rich text editor-------------------- */}
          {/* <div className="rich-text-editor">
          <h4>To visit</h4>
          <ReactQuill
          placeholder="wish to visit"
          modules={TripsForm.modules}
          formats={TripsForm.formats}
          onChange={(e) => {
            const delta = e;
            setVisits(delta);
          }}
          value={visits}
          />
        </div> */}
          {/* --------option2--------teaxt area-------------------- */}
          <label>Wish List</label>
          <h4>To visit</h4>
          <textarea
            className="trips_form-textarea"
            placeholder="Enter review description..."
            required={true}
            name="review"
            value={visit}
            onChange={(event) => setVisits([event.target.value])}
          />
        </div>
        <button type="submit">{state ? "Update" : "Upload"}</button>
      </form>
    </div>
  );
}

// TripsForm.modules = {
//   toolbar: [
//     [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
//     [{ size: [] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["link", "image", "video"],
//     ["clean"],
//     ["code-block"],
//   ],
// };

// TripsForm.formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "link",
//   "image",
//   "video",
//   "code-block",
// ];
export default TripsForm;
