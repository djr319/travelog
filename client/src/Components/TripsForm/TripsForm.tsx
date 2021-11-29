import "./TripsForm.css";
import { SyntheticEvent, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

export default function TripsForm(): JSX.Element {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState<string[]>([]);
  const [sights, setSights] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!destination) {
      alert("please fill in all the fields");
      return;
    }
    setDestination("");
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
            <label>Country/City</label>
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
                onChange={(event) => {
                  if (
                    typeof event[0] === "string" &&
                    typeof event[1] === "string"
                  )
                  setDates([event[0], event[1]]);
                }}
              />
            </div>
            {/* --------------TO VISIT------------------ */}
            <label>Wish List</label>
            <h4>To visit</h4>
            <div className="todo-list">
              <input
                type="text"
                placeholder="wish to visit..."
                value={sights}
                onChange={(event) => setSights(event.target.value)}
              ></input>
            </div>
            {/* ----------------------TAGS-------------------- */}
            <label>Tags</label>
            <h4>interested in getting a review for</h4>
            <div className="tags-list">
              <input
                type="text"
                placeholder="add tags..."
                value={tags}
                onChange={(event) => setTags(event.target.value)}
              ></input>
            </div>
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

//-------------------------TODO LATER-------------------
// setSights((prev) => {
//   if (prev) {
//     return [...prev, event.target.value];
//   } else {
//     return [event.target.value];
//   }
// })
// }
// ></input>
// <ul>
// {sights && sights.length && sights.map(sight => <li>{sight}</li>)}
// </ul>
