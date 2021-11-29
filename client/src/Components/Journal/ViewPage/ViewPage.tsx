import './ViewPage.css';

type InputPageProps = {
	text: string;
};

export default function ViewPage ({ text }: InputPageProps) {
	return (
		<div className='journal__view'>
			<div className='journal__view-text'>{text}</div>
			<div className='journal__view-buttons'>
				<button className='journal__view-update'>Update</button>
				<button className='journal__view-delete'>Delete</button>
			</div>
		</div>
	);
}
