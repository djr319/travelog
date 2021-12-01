import { useQuery, useMutation } from 'react-query';
import { Journal as JournalType } from 'Types/index';
import { useState, useEffect } from 'react';

import { JournalAPI } from 'Services/index';
import { JournalsList } from 'Components/index';
import JournalMenu from './JournalMenu/JournalMenu';
import CreatePage from './CreatePage/CreatePage';
import EditPage from './EditPage/EditPage';
import ViewPage from './ViewPage/ViewPage';

import './Journal.css';

const USER_ID = 0;

export default function Journal (): JSX.Element {
	const [ journals, setJournals ] = useState<JournalType[]>([]);
	const [ page, setPage ] = useState(
		<CreatePage handleSubmit={handleSubmit} />
	);

	// Queries
	const getJournals = useQuery('userJournals', async () => {
		const data = await JournalAPI.getAllJournals(USER_ID);
		return data;
	});

	// Mutations
	const updateJournal = useMutation(
		({ id, review }: { id: number, review: string }) => {
			return JournalAPI.updateJournal(id, { review, userId: USER_ID });
		}
	);

	const deleteJournal = useMutation(
		({ id }: { id: number }) => {
			return JournalAPI.deleteJournal(id);
		}
	);

	useEffect(() => {
		(async () => {
			const journals = getJournals.data;
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

		updateJournal.mutate({ id, review });

		const journalsCopy = [ ...journals ];
		journalsCopy[id] = { review, userId: USER_ID };

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

		deleteJournal.mutate({id});

		const journalsCopy = [ ...journals ];
		journalsCopy.splice(id, 1);

		setJournals(journalsCopy);
		setPage(<CreatePage handleSubmit={handleSubmit} />);
	}

	function handleSubmit (e: React.FormEvent<HTMLFormElement>, review: string) {
		e.preventDefault();

		const nextJournalId = journals.length;
		JournalAPI.addJournal({ review, userId: USER_ID });
		setJournals([ ...journals, { review, userId: USER_ID } ]);
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
