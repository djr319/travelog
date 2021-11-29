type EntryProps = {
	text: string;
	id: number;
	handleClick: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		key: number
	) => void;
};

export default function Entry ({ text, id, handleClick }: EntryProps): JSX.Element {
	return (
		<div
			className='journal__menu-select-entry'
			onClick={(e) => handleClick(e, id)}>
			{text}
		</div>
	);
}