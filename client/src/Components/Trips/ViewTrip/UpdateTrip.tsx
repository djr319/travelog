import "./UpdateTrip.css";
import { useState } from "react";

type updateTripProps = {
  id: number;
  text: string;
  updateEntry: (
    e: React.FormEvent<HTMLButtonElement>,
    id: number,
    text: string
  ) => void;
};

export default function UpdateTrip({
  id,
  text: newText,
  updateEntry,
}: updateTripProps): JSX.Element {
  const [text, setText] = useState(newText);

  function saveChanges(e: React.FormEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    const text = e.currentTarget.value;
    setText(text);
  }
  return (
    <form>
      <div>
        <textarea
          className="trip-update-textarea"
          placeholder="type the changes"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onInput={saveChanges}
        />
      </div>
      <button onSubmit={(e) => updateEntry(e, id, text)} className="trip-update-button" type="submit">
        Update
      </button>
    </form>
  );
}
