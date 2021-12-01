import "./TripsForm.css";
import { SyntheticEvent, useState } from "react";
// import { DateRangePicker } from "rsuite";
import { useNavigate } from "react-router-dom";
// import "rsuite/dist/rsuite.min.css";
import tripsService from "Services/trips.service";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";
import format from "date-fns/format";

function TripsForm(): JSX.Element {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [visits, setVisits] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({});
  const toggle = () => setIsOpen(!isOpen);

  async function postTripHandler(
    destination: string,
    dateFrom: string,
    dateTo: string,
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
      alert("please fill  in all the fields");
      return;
    }

    if (dateRange.startDate && dateRange.endDate) {
      postTripHandler(
        destination,
        format(dateRange.startDate, "Do MMM yyyy"),
        format(dateRange.endDate, "Do MMM yyyy"),
        visits
      );
      setDestination("");
      navigate("/trip", {
        state: {
          destination,
          dateRange,
          visits,
        },
      });
    }
  };

  const handleTextEditor = (e: any) => {
    setVisits(e);
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
                open={isOpen}
                toggle={toggle}
                onChange={(range) => setDateRange(range)}
              />
              {/* <DateRangePicker
                onChange={(event) => {
                  if (
                    typeof event[0] === "string" &&
                    typeof event[1] === "string"
                    ) {
                      return setDates([event[0], event[1]]);
                    }
                  }}
                /> */}
              <div aria-label="toggle dates button" onClick={toggle}>
                {isOpen ? "Close" : "Set Dates"}
              </div>
            </div>
            {/* --------------TO VISIT------------------ */}
            {/* <label>Wish List</label>
            <h4>To visit</h4>
            <div className="todo-list">
              <input
                type="text"
                value={sights}
                placeholder="wish to visit..."
                onChange={(event) => setSights(event.target.value)}
              ></input>
            </div>*/}
          </div>
          {/* -----------------rich text editor-------------------- */}
          <div className="rich-text-editor">
            <h4>To visit</h4>
            <ReactQuill
              placeholder="wish to visit"
              modules={TripsForm.modules}
              formats={TripsForm.formats}
              onChange={handleTextEditor}
              value={visits}
            />
          </div>

          <button type="submit">Upload</button>
        </form>
      </div>

      <div></div>
    </div>
  );
}

TripsForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

TripsForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];
export default TripsForm;
