import { JournalAPI } from 'Services/index';
import { useState } from 'react';
import './Journal.css';
import Arrow from 'Assets/arrow.svg';

const MIN_LEN = 10;
const MAX_LEN = 30;

export default function Journal (): JSX.Element {
	const [ review, setReview ] = useState('');

  const [ menuPos, setMenuPos ] = useState({ left: -105 });
  const [ arrowRot, setArrowRot ] = useState(180);

	async function handleSubmit () {
		JournalAPI.addJournal({ review });
	}

  function toggleMenu () {
    setMenuPos((prev) => { return { left: -prev.left }});
    setArrowRot((prev) => 180 - prev);
  }

	function onChange (e: React.FormEvent<HTMLTextAreaElement>) {
		setReview(e.currentTarget.value);
	}

	return (
		<div className='journal'>
			<div className='journal__menu' style={menuPos}>
				<img className='journal__menu-button' src={Arrow} onClick={toggleMenu} style={{transform: `rotate(${arrowRot}deg)`}}/>
				<div className='journal__menu-select-container'>
					<div className='journal__menu-select'>
						<div className='journal__menu-select-entry'>Journal 1</div>
						<div className='journal__menu-select-entry'>Journal 2</div>
					</div>
					<div />
				</div>
			</div>
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
					{review.length < MIN_LEN ? (
						'Insufficient characters.'
					) : (
						`${review.length}/${MAX_LEN} characters.`
					)}
				</div>
				<button type='submit'>Add story</button>
			</form>
		</div>
	);
}
