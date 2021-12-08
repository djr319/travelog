import { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { PicturesUpload } from 'Components';
import { Journal } from 'Types';
import './JournalPage.css';

// NOTE min/max for entry text length
const MIN_LEN = 5;
const MAX_LEN = 300;

type JournalPageProps = {
	journal: Journal;
	updateEntry: (id: number, text: string, photo: string) => void;
	deleteEntry: (e: MouseEvent<HTMLButtonElement>, id: number) => void;
	handleSubmit: (review: string, photoURL: string) => void;
};

export default function JournalPage ({
	journal,
	handleSubmit,
	updateEntry,
	deleteEntry
}: JournalPageProps): JSX.Element {
	const { id, review, photoURL } = journal;

	const [ text, setText ] = useState('');
	const [ photo, setPhoto ] = useState('');
	const [ inViewMode, setInViewMode ] = useState(!!review.length);

  useEffect(() => {
    setText(review);
    setPhoto(photoURL);
    setInViewMode(!!review.length);
  }, [review, photoURL])

	function sendSubmit (e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setInViewMode(true);
		handleSubmit(text, photo);
	}

	function updateReview (e: FormEvent<HTMLTextAreaElement>) {
		e.preventDefault();

		const text = e.currentTarget.value;
		setText(text);
		setPhoto(photo);
	}

	function sendUpdate (e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		updateEntry(id, text, photo);
		setInViewMode(false);
	}

	return (
		<form className='journal__form' onSubmit={sendSubmit}>
			<p>Pictures</p>

			{inViewMode ? (
				<div>
					<img className='journal__photo' src={photo} alt='a picture' />
					<div className='journal__view-text'>{text}</div>
					<button className='journal__view-update' onClick={sendUpdate}>
						Update
					</button>
					<button
						className='journal__view-delete'
						onClick={(e) => deleteEntry(e, id)}>
						Delete
					</button>
				</div>
			) : (
				<div>
					<PicturesUpload setPicture={setPhoto} />
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
					</div>

					{text.length < MIN_LEN ? (
						'Insufficient characters.'
					) : (
						`${text.length}/${MAX_LEN} characters.`
					)}
					<button className='journal__form-submit' type='submit'>
						Save story
					</button>
				</div>
			)}
		</form>
	);
}
