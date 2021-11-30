import './EditPage.css';
import { useState } from 'react';

// NOTE min/max for entry text length
const MIN_LEN = 10;
const MAX_LEN = 30;

type EditPageProps = {
	id: number
	text: string;
	updateEntry: (e: React.FormEvent<HTMLFormElement>, id: number, text: string) => void;
};

export default function EditPage ({
	id,
	text: entryText,
	updateEntry
}: EditPageProps): JSX.Element {
	const [ text, setText ] = useState(entryText);

	function updateReview (e: React.FormEvent<HTMLTextAreaElement>) {
		e.preventDefault();

		const text = e.currentTarget.value;
		setText(text);
	}

	return (
		<form className='journal__form' onSubmit={(e) => updateEntry(e, id, text)}>
			<div className='journal__form-textarea-container'>
				<textarea
					className='journal__form-textarea'
					placeholder='Enter review description...'
					required={true}
					minLength={MIN_LEN}
					maxLength={MAX_LEN}
					name='review'
					value={text}
					onInput={updateReview}
				/>
				{text.length < MIN_LEN ? (
					'Insufficient characters.'
				) : (
					`${text.length}/${MAX_LEN} characters.`
				)}
			</div>
			<button className='journal__form-submit' type='submit'>
				Post update
			</button>
		</form>
	);
}
