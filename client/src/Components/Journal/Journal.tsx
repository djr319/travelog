import { Journal as JournalType } from 'Types/index';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from 'Context';

import { JournalAPI } from 'Services/index';
import { JournalsList } from 'Components/index';
import JournalMenu from './JournalMenu/JournalMenu';
import CreatePage from './CreatePage/CreatePage';
import EditPage from './EditPage/EditPage';
import ViewPage from './ViewPage/ViewPage';

import './Journal.css';
import ar from 'date-fns/esm/locale/ar/index.js';

function getFreeJournalId (journals: JournalType[]) {
	const maxId = Math.max(...journals.map((journal) => journal.id));
	return maxId + 1;
}

export default function Journal (): JSX.Element {
	const [ journals, setJournals ] = useState<JournalType[]>([]);
	const [ page, setPage ] = useState(
		<CreatePage handleSubmit={handleSubmit} />
	);

	const { uid } = useContext(UserContext);

	useEffect(() => {
		(async () => {
			const journals = await JournalAPI.getAllJournals(uid);
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

		JournalAPI.updateJournal(uid, { id, review });

		const journalsCopy = [...journals];
		const journalCopy = journalsCopy.find((journal) => journal.id === id);
		if (journalCopy) journalCopy.review = review;

		setJournals(journalsCopy);
		setPage(
			<ViewPage
				id={id}
				text={review}
				switchEditMode={switchEditMode}
				deleteEntry={deleteEntry}
			/>
		);
	}

	function deleteEntry (e: React.MouseEvent<HTMLButtonElement>, id: number) {
		e.preventDefault();

		JournalAPI.deleteJournal(uid, id);

		const index = journals.findIndex((journal) => journal.id === id);
		const journalsCopy = [ ...journals ];
		journalsCopy.splice(index, 1);

		setJournals(journalsCopy);
		setPage(<CreatePage handleSubmit={handleSubmit} />);
	}

	function handleSubmit (e: React.FormEvent<HTMLFormElement>, review: string) {
		e.preventDefault();

		const nextJournalId = journals.length;
		JournalAPI.addJournal(uid, { id: getFreeJournalId(journals), review });
		setJournals([ ...journals, { id: getFreeJournalId(journals), review } ]);
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

	function handleNew (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.preventDefault();

		// FIXME: using journals array index as id is not safe
		setPage(<CreatePage handleSubmit={handleSubmit} />);
	}

	function handleClick (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: number
	) {
		e.preventDefault();

		// FIXME: using journals array index as id is not safe
		const journal = journals.find((journal) => journal.id === id);
		if (journal === undefined) return;
		
		setPage(
			<ViewPage
				id={journal.id}
				text={journal.review}
				switchEditMode={switchEditMode}
				deleteEntry={deleteEntry}
			/>
		);
	}

	return (
		<div className='journal'>
			<JournalMenu
				journals={journals}
				handleClick={handleClick}
				handleNew={handleNew}
			/>
			{page}
			<JournalsList journals={journals} />
		</div>
	);
}
