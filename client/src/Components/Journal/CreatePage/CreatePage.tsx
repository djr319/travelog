import '../EditPage/EditPage.css';
import { useState, useContext } from 'react';

// CHECK THE IMPLEMENTATION OF NOTIFY
// import toast from 'react-hot-toast';
// import { UserContext } from 'Context';

// NOTE min/max for entry text length
const MIN_LEN = 10;
const MAX_LEN = 30;

type EditPageProps = {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>, text: string) => void;
};

export default function EditPage ({
	handleSubmit
}: EditPageProps): JSX.Element {
	const [ text, setText ] = useState('');

	function updateReview (e: React.FormEvent<HTMLTextAreaElement>) {
		e.preventDefault();

		const text = e.currentTarget.value;
		setText(text);
	}


	// !!! CHECK IF THE IMPLEMENTATION OF NOTIFY WORKS ONCE WE HAVE MORE USERS REGISTERED IN THE SAME DB
	// const { uid } = useContext(UserContext);
	// const notify = () => uid !== uid ? toast('New journal is published.') : null;

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
			<button className='journal__form-submit' type='submit'> {/* onClick={notify} CHECK THE IMPLEMENTATION OF NOTIFY */}
				Save story
			</button>
		</form>
	);
}
