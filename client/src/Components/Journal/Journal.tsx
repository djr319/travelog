import { useState } from 'react';
import { JournalAPI } from 'Services/index';

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
				<textarea name='review' value={review} onInput={onChange} />
				<button type='submit'>Save Journal</button>
			</form>
		</div>
	);
}
