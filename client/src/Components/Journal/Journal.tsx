import { useState, useEffect } from 'react';
import { JournalAPI } from 'Services/index';
import { Journal as JournalType } from 'Types/index';
import Arrow from 'Assets/arrow.svg';
import './Journal.css';

// NOTE min/max for entry text length
const MIN_LEN = 10;
const MAX_LEN = 30;

type EntryProps = {
	text: string;
	id: number;
	handleClick: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		key: number
	) => void;
};

function Entry ({ text, id, handleClick }: EntryProps): JSX.Element {
	return (
		<div
			className='journal__menu-select-entry'
			onClick={(e) => handleClick(e, id)}>
			{text}
		</div>
	);
}

export default function Journal (): JSX.Element {
	const [ journals, setJournals ] = useState<JournalType[]>([]);
	const [ review, setReview ] = useState('');

	const [ menuPos, setMenuPos ] = useState(-105);
	const [ arrowRot, setArrowRot ] = useState(180);

	useEffect(() => {
		(async () => {
			const journals = await JournalAPI.getAllJournals();
			// FIXME: remove check once API linked?
			if (journals === undefined) {
				setJournals([]);
			} else {
				setJournals(journals);
			}
		})();
	}, []);

	async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setJournals([ ...journals, { review } ]);
		setReview('');

		await JournalAPI.addJournal({ review });
	}

	function toggleMenu () {
		setMenuPos((prev) => {
			if (prev >= 0) {
				return -105;
			}
			return 0;
		});
		setArrowRot((prev) => 180 - prev);
	}

	function handleChange (e: React.FormEvent<HTMLTextAreaElement>) {
		e.preventDefault();

		setReview(e.currentTarget.value);
	}

	function handleClick (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: number
	) {
		e.preventDefault();

    setReview(journals[id].review);
	}

	return (
		<div className='journal'>
			<div className='journal__menu' style={{ left: menuPos }}>
				<img
					className='journal__menu-button'
					src={Arrow}
					onClick={toggleMenu}
					style={{ transform: `rotate(${arrowRot}deg)` }}
				/>
				<div className='journal__menu-select-container'>
					<div className='journal__menu-select'>
						<div className='journal__menu-select-entry'>Create story</div>
						{journals.map((entry, i) => (
							<Entry
								key={i}
								id={i}
								text={entry.review}
								handleClick={handleClick}
							/>
						))}
					</div>
					<div />
				</div>
			</div>
			<form className='journal__form' onSubmit={handleSubmit}>
				<div className='journal__form-textarea-container'>
					<textarea
						className='journal__form-textarea'
						placeholder='Enter review description...'
						required={true}
						minLength={MIN_LEN}
						maxLength={MAX_LEN}
						name='review'
						value={review}
						onInput={handleChange}
					/>
					{review.length < MIN_LEN ? (
						'Insufficient characters.'
					) : (
						`${review.length}/${MAX_LEN} characters.`
					)}
				</div>
				<button className='journal__form-submit' type='submit'>
					Add story
				</button>
			</form>
		</div>
	);
}
