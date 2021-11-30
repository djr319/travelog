import './ViewPage.css';

type InputPageProps = {
	id: number;
	text: string;
	switchEditMode: (
		e: React.MouseEvent<HTMLButtonElement>,
		id: number,
		text: string
	) => void;
	deleteEntry: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
};

export default function ViewPage ({
	id,
	text,
	switchEditMode,
	deleteEntry
}: InputPageProps) {
	return (
		<div className='journal__view'>
			<div className='journal__view-text'>{text}</div>
			<div className='journal__view-buttons'>
				<button
					className='journal__view-update'
					onClick={(e) => switchEditMode(e, id, text)}>
					Update
				</button>
				<button
					className='journal__view-delete'
					onClick={(e) => deleteEntry(e, id)}>
					Delete
				</button>
			</div>
		</div>
	);
}
