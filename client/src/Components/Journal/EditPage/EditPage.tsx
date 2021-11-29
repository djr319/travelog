import './EditPage.css';
import { useState } from 'react';

// NOTE min/max for entry text length
const MIN_LEN = 10;
const MAX_LEN = 30;

type EditPageProps = {
	text: string;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>, text: string) => void;
};

export default function EditPage ({
	text: entryText,
	handleSubmit
}: EditPageProps): JSX.Element {
	const [ text, setText ] = useState(entryText);

	function updateReview (e: React.FormEvent<HTMLTextAreaElement>) {
		e.preventDefault();

		const text = e.currentTarget.value;
		setText(text);
	}

	return (
		<form className='journal__form' onSubmit={(e) => handleSubmit(e, text)}>
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
				Add story
			</button>
		</form>
	);
}
