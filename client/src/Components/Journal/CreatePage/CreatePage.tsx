import "../EditPage/EditPage.css";
import { Dispatch, SetStateAction, useState } from "react";
import PicturesUpload from "Components/Pictures/Pictures";
import { Journal } from "Types";

// NOTE min/max for entry text length
const MIN_LEN = 10;
const MAX_LEN = 30;

type CreatePageProps = {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    text: string,
    photoURL: string
  ) => void;
};

export default function CreatePage({
  handleSubmit,
}: CreatePageProps): JSX.Element {
  const [text, setText] = useState("");
  const [photoURL, setPhotoURL] = useState<Journal["photoURL"]>("");
  function updateReview(e: React.FormEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    const text = e.currentTarget.value;
    setText(text);
  }

  // !!! CHECK IF THE IMPLEMENTATION OF NOTIFY WORKS ONCE WE HAVE MORE USERS REGISTERED IN THE SAME DB
	// const { uid } = useContext(UserContext);
	// const notify = () => uid !== uid ? toast('New journal is published.') : null;

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
      <button className="journal__form-submit" type="submit"> {/* onClick={notify} CHECK THE IMPLEMENTATION OF NOTIFY */}
        Save story
      </button>
    </form>
  );
}
