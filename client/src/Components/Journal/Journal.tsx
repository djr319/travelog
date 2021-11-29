import { JournalAPI } from 'Services/index';
import { useState } from 'react';
import './Journal.css';

const MIN_LEN = 10;
const MAX_LEN = 30;

export default function Journal (): JSX.Element {
	const [ review, setReview ] = useState('');

	async function handleSubmit () {
		JournalAPI.addJournal({ review });
	}

	function onChange (e: React.FormEvent<HTMLTextAreaElement>) {
		setReview(e.currentTarget.value);
	}

	return (
		<div className='journal'>
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
          {review.length < MIN_LEN ? 'Insufficient characters.' : `${review.length}/${MAX_LEN} characters.`}
				</div>
				<button type='submit'>Save Journal</button>
			</form>
		</div>
	);
}
