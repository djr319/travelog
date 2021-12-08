import '../EditPage/EditPage.css';
import { useState, FormEvent } from 'react';
import { PicturesUpload } from 'Components';
import { Journal } from 'Types';

// NOTE min/max for entry text length
const MIN_LEN = 5;
const MAX_LEN = 300;

type JournalPageProps = {
	journal: Journal;
	updateEntry: (
		e: FormEvent<HTMLFormElement>,
		id: number,
		review: string,
		photoURL: string
	) => void;
	deleteEntry: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
	handleSubmit: (
		e: React.FormEvent<HTMLFormElement>,
		review: string,
		photoURL: string
	) => void;
};

export default function JournalPage ({
	journal, handleSubmit, updateEntry, deleteEntry
}: JournalPageProps): JSX.Element {
	const { id, review, photoURL } = journal;

  const [ text, setText ] = useState(review);
  const [ photo, setPhoto] = useState(photoURL);

	function switchEditMode (
		e: React.MouseEvent<HTMLButtonElement>,
	) {
		e.preventDefault();
	}

  function updateReview(e: React.FormEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    const text = e.currentTarget.value;
    setText(text);
    setPhoto(photo);
  }

	return (
		<form
			className='journal__form'
			onSubmit={(e) => handleSubmit(e, text, photoURL)}>
			<div className='journal__form-textarea-container'>
				<p>Pictures</p>
				<PicturesUpload setPicture={setPhoto} />
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
				Save story
			</button>
		</form>
	);
}
