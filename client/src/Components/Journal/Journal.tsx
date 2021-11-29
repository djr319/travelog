import { Journal as JournalType } from 'Types/index';
import { useState, useEffect } from 'react';

import { JournalAPI } from 'Services/index';
import JournalMenu from './JournalMenu';
import CreatePage from './CreatePage/CreatePage';
import EditPage from './EditPage/EditPage';
import ViewPage from './ViewPage/ViewPage';

import './Journal.css';

export default function Journal (): JSX.Element {
	const [ journals, setJournals ] = useState<JournalType[]>([]);
	const [ page, setPage ] = useState(
		<CreatePage handleSubmit={handleSubmit} />
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

  function updateEntry (
		e: React.FormEvent<HTMLFormElement>,
    id: number,
		review: string
	) {
		e.preventDefault();

		JournalAPI.updateJournal(id, { review });

    const journalsCopy = [...journals];
    journalsCopy[id] = { review };

    setJournals(journalsCopy);
    setPage(<ViewPage
      id={id}
      text={review}
      switchEditMode={switchEditMode}
      deleteEntry={deleteEntry}
    />);
	}

  function deleteEntry (e: React.MouseEvent<HTMLButtonElement>, id: number) {
		e.preventDefault();

    JournalAPI.deleteJournal(id);

    const journalsCopy = [...journals];
    journalsCopy.splice(id, 1);
    
    setJournals(journalsCopy);
    setPage(<CreatePage handleSubmit={handleSubmit} />);
	}

	function handleSubmit (
		e: React.FormEvent<HTMLFormElement>,
		review: string
	) {
		e.preventDefault();

    const nextJournalId = journals.length;
		JournalAPI.addJournal({ review });
		setJournals([ ...journals, { review } ]);
		setPage(
			<ViewPage
				id={nextJournalId}
				text={review}
				switchEditMode={switchEditMode}
				deleteEntry={deleteEntry}
			/>
		);
	}

	function switchEditMode (
		e: React.MouseEvent<HTMLButtonElement>,
		id: number,
		text: string
	) {
		e.preventDefault();

		setPage(<EditPage id={id} text={text} updateEntry={updateEntry} />);
	}

	function handleClick (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: number
	) {
		e.preventDefault();

		// FIXME: using journals array index as id is not safe
		setPage(
			<ViewPage
				id={id}
				text={journals[id].review}
				switchEditMode={switchEditMode}
				deleteEntry={deleteEntry}
			/>
		);
	}

	return (
		<div className='journal'>
			<JournalMenu journals={journals} handleClick={handleClick} />
			{page}
		</div>
	);
}
