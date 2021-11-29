import { JournalAPI } from 'Services/index';
import { useState } from 'react';
import './Journal.css';

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
				<textarea
					className='journal__form-textarea'
          placeholder='Enter review description...'
          required={true}
					maxLength={MAX_LEN}
					name='review'
					value={review}
					onInput={onChange}
				/>
				<button type='submit'>Save Journal</button>
			</form>
		</div>
	);
}
