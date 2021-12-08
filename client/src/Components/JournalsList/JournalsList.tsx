import { Journal } from "Types/index";
import "./JournalsList.css";

type JournalsListProps = {
  journals: Journal[];
};

export default function JournalsList({
  journals,
}: JournalsListProps): JSX.Element {
  if (journals && journals.length) {
    return <span />;
  }
  return (
    <div className="journals-list">
      <h3>Journals matching your interests</h3>
      <div className="journals-list__list">
        {journals &&
          journals.length &&
          journals.map(({ review }, i) => (
            <div key={review + i} className="journals-list__entry">
              {review}
            </div>
          ))}
      </div>
    </div>
  );
}
