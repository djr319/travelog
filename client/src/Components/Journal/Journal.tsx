import { Journal as JournalType } from 'Types/index';
import { useState, useEffect } from 'react';
import { JournalAPI } from 'Services/index';
import JournalMenu from './JournalMenu';
import EditPage from './EditPage/EditPage';
import ViewPage from './ViewPage/ViewPage';

import './Journal.css';

export default function Journal (): JSX.Element {
	const [ journals, setJournals ] = useState<JournalType[]>([]);
	const [ page, setPage ] = useState(
		<EditPage
			text=''
			handleSubmit={handleSubmit}
		/>
	);

	useEffect(() => {
		(async () => {
			const journals = await JournalAPI.getAllJournals();
			// FIXME: remove check once API linked?
			if (journals === undefined) {
				setJournals([]);
			} else {
				setJournals(journals);
			}
		})();
	}, []);

	async function handleSubmit (e: React.FormEvent<HTMLFormElement>, review: string) {
		e.preventDefault();
    console.log('review', review);
		JournalAPI.addJournal({ review });
		setJournals([ ...journals, { review } ]);
	}

	function handleClick (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: number
	) {
		e.preventDefault();

    setPage(<ViewPage text={journals[id].review} />);
	}

	return (
		<div className='journal'>
			<JournalMenu journals={journals} handleClick={handleClick} />
      {page}
		</div>
	);
}
