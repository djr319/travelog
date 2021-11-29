import { useState, useEffect } from 'react';
import { JournalAPI } from 'Services/index';
import { Journal as JournalType } from 'Types/index';
import Arrow from 'Assets/arrow.svg';
import './Journal.css';

const MIN_LEN = 10;
const MAX_LEN = 30;

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

	function onChange (e: React.FormEvent<HTMLTextAreaElement>) {
    e.preventDefault();

		setReview(e.currentTarget.value);
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
            {journals.map((entry) => <div className='journal__menu-select-entry'>{entry.review}</div>)}
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
						onInput={onChange}
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
