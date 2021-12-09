import { Link } from "react-router-dom";
import { Journal } from "Types/index";
import "./JournalsList.css";

type JournalsListProps = {
  journals: Journal[];
};

export default function JournalsList({
  journals,
}: JournalsListProps): JSX.Element {
  if (journals.length === 0) {
    return <span />;
  }
  return (
    <div className="journals-list">
      <h3>Journals matching your interests</h3>
      <div className="journals-list__list">
        {journals.length &&
          journals.map(({ review, photoURL }, i) => (
            <Link to="/chat" key={review + i} className="journals-list__entry">
              <span>{review}</span>
              <img src={photoURL} />
            </Link>
          ))}
      </div>
    </div>
  );
}
