import { Journal } from 'Types/index';

type JournalsListProps = {
	journals: Journal[];
};

export default function JournalsList ({
	journals
}: JournalsListProps): JSX.Element {
	return (
		<div className='journals-list'>
      <h1>Journals matching your interests</h1>
			{journals.map(({ review }) => (
				<div className='journals-list__entry'>{review}</div>
			))}
		</div>
	);
}
