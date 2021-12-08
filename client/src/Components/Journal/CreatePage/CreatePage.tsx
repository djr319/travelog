import "../EditPage/EditPage.css";
import { useState, FormEvent } from "react";
import { PicturesUpload } from "Components";
import { Journal } from "Types";

// NOTE min/max for entry text length
const MIN_LEN = 5;
const MAX_LEN = 300;

type CreatePageProps = {
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    text: string,
    photoURL: string
  ) => void;
};

export default function CreatePage({
  handleSubmit,
}: CreatePageProps): JSX.Element {
  const [text, setText] = useState("");
  const [photoURL, setPhotoURL] = useState<Journal["photoURL"]>("");
  function updateReview(e: FormEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    const text = e.currentTarget.value;
    setText(text);
  }

  return (
    <form
      className="journal__form"
      onSubmit={(e) => handleSubmit(e, text, photoURL)}
    >
      <div className="journal__form-textarea-container">
        <p>Pictures</p>
        <PicturesUpload setPicture={setPhotoURL} />
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
        Save story
      </button>
    </form>
  );
}
