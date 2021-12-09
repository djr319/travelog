import { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { PicturesUpload } from 'Components';
import { Journal } from 'Types';
import './JournalPage.css';

// NOTE min/max for entry text length
const MIN_LEN = 5;
const MAX_LEN = 300;

type JournalPageProps = {
	journal: Journal;
	deleteEntry: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
	handleSubmit: (journal: Journal) => void;
};

export default function JournalPage ({
	journal,
	handleSubmit,
	deleteEntry
}: JournalPageProps): JSX.Element {
	const { id, uid, review, photoURL, tags } = journal;
	console.log(journal);

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

		const journal = {id, uid, review: text, photoURL: photo, tags: []};
		handleSubmit(journal);
		setInViewMode(true);
	}

	function updateReview (e: FormEvent<HTMLTextAreaElement>) {
		e.preventDefault();

		const text = e.currentTarget.value;
		setText(text);
	}

	function updatePhoto (url: string) {
		setPhoto(url);
	}

	function sendUpdate (e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		const journal = {id, uid, review: text, photoURL: photo, tags: tags};
		handleSubmit(journal);
		setInViewMode(false);
	}

	return (
		<form className='journal__form' onSubmit={sendSubmit}>

			{inViewMode ? (
				<div className="journal-group">
					<img className='journal__photo' src={photoURL} alt='picture' />
          <div className='journal__view-text'>{text}</div>
          <div className="button-group">
					<button className='button journal__view-update' onClick={sendUpdate}>
						Update
					</button>
					<button
						className='button journal__view-delete'
						onClick={(e) => deleteEntry(e, id)}>
						Delete
            </button>
            </div>
				</div>
			) : (
          <div className="flex-container">
            <h2>Journal Entry</h2>
					<PicturesUpload givenURL={photoURL} sendUrl={updatePhoto} />

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
						<p className="warn">Insufficient characters.</p>
					) : (
						<p>{text.length}/{MAX_LEN} characters</p>
					)}
					<button className='button journal__form-submit' type='submit'>
						Save story
					</button>
				</div>
			)}
		</form>
	);
}
