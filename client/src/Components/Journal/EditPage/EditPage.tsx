import "./EditPage.css";
import { Dispatch, SetStateAction, useState } from "react";
import { Journal } from "Types";
// NOTE min/max for entry text length
const MIN_LEN = 10;
const MAX_LEN = 30;

type EditPageProps = {
  id: number;
  text: string;
  picture: Journal["picture"];
  setPicture: Dispatch<SetStateAction<Journal["picture"]>>;
  updateEntry: (
    e: React.FormEvent<HTMLFormElement>,
    id: number,
    text: string,
    picture: Journal["picture"]
  ) => void;
};

export default function EditPage({
  id,
  text: entryText,
  picture,
  setPicture,
  updateEntry,
}: EditPageProps): JSX.Element {
  const [text, setText] = useState(entryText);

  function updateReview(e: React.FormEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    const text = e.currentTarget.value;
    setText(text);
    setPicture(picture);
  }

  return (
    <form
      className="journal__form"
      onSubmit={(e) => updateEntry(e, id, text, picture)}
    >
      <div className="journal__form-textarea-container">
        <textarea
          className="journal__form-textarea"
          placeholder="Enter review description..."
          required={true}
          minLength={MIN_LEN}
          maxLength={MAX_LEN}
          name="review"
          value={text}
          onInput={updateReview}
        />
        {text.length < MIN_LEN
          ? "Insufficient characters."
          : `${text.length}/${MAX_LEN} characters.`}
      </div>
      <button className="journal__form-submit" type="submit">
        Post update
      </button>
    </form>
  );
}
