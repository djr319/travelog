import "./EditPage.css";
import { useState } from "react";
import { Journal } from "Types";
import { PicturesUpload } from "Components";
// NOTE min/max for entry text length
const MIN_LEN = 5;
const MAX_LEN = 300;

type EditPageProps = {
  id: number;
  text: string;
  photoURL: string;
  updateEntry: (
    e: React.FormEvent<HTMLFormElement>,
    id: number,
    text: string,
    photoURL: Journal["photoURL"]
  ) => void;
};

export default function EditPage({
  id,
  text: entryText,
  photoURL,
  updateEntry,
}: EditPageProps): JSX.Element {
  const [text, setText] = useState(entryText);
  const [photo, setPhoto] = useState(photoURL);
  function updateReview(e: React.FormEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    const text = e.currentTarget.value;
    setText(text);
    setPhoto(photo);
  }

  return (
    <form
      className="journal__form"
      onSubmit={(e) => updateEntry(e, id, text, photoURL)}
    >
      <div className="journal__form-textarea-container">
        {/* <img
          className="journal-picture"
          src={photoURL}
          alt="journal-picture"
        ></img> */}
        <PicturesUpload setPicture={setPhoto} />
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
