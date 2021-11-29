import { Journal as JournalType } from 'Types/index';
import { useState, useEffect } from 'react';
import { JournalAPI } from 'Services/index';
import JournalMenu from './JournalMenu';

import './Journal.css';

// NOTE min/max for entry text length
const MIN_LEN = 10;
const MAX_LEN = 30;

export default function Journal (): JSX.Element {
	const [ journals, setJournals ] = useState<JournalType[]>([]);
	const [ review, setReview ] = useState('');

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
			<JournalMenu journals={journals} handleClick={handleClick} />
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
