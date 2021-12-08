import "./ViewPage.css";

type InputPageProps = {
  id: number;
  text: string;
  photoURL: string;
  switchEditMode: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    text: string,
    photoURL: string
  ) => void;
  deleteEntry: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
};

export default function ViewPage({
  id,
  text,
  photoURL,
  switchEditMode,
  deleteEntry,
}: InputPageProps): JSX.Element {
  return (
    <div className="journal__view">
      <div className="journal__view-text">{text}</div>
      <img
        style={{ height: 200, width: 300 }}
        className="journal-picture"
        src={photoURL}
        alt="journal-picture"
      ></img>
      <div className="journal__view-buttons">
        <button
          className="journal__view-update"
          onClick={(e) => switchEditMode(e, id, text, photoURL)}
        >
          Update
        </button>
        <button
          className="journal__view-delete"
          onClick={(e) => deleteEntry(e, id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
