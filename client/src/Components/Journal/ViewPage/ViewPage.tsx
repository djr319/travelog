import "./ViewPage.css";

type InputPageProps = {
  id: number;
  text: string;
  picture: string;
  switchEditMode: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    text: string,
    picture: string
  ) => void;
  deleteEntry: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
};

export default function ViewPage({
  id,
  text,
  picture,
  switchEditMode,
  deleteEntry,
}: InputPageProps): JSX.Element {
  return (
    <div className="journal__view">
      <div className="journal__view-text">{text}</div>
      <img
        className="journal-picture"
        src={picture}
        alt="journal-picture"
      ></img>
      <div className="journal__view-buttons">
        <button
          className="journal__view-update"
          onClick={(e) => switchEditMode(e, id, text, picture)}
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
