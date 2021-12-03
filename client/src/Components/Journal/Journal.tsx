import { useQuery, useMutation } from 'react-query';
import { Journal as JournalType } from 'Types/index';
import {
	useContext,
	useState,
	useEffect,
} from 'react';
import { UserContext } from 'Context';
import { JournalProvider } from './journal.context';

import { JournalAPI } from 'Services/index';
import { JournalsList } from 'Components/index';
import JournalMenu from './JournalMenu/JournalMenu';
import CreatePage from './CreatePage/CreatePage';
import EditPage from './EditPage/EditPage';
import ViewPage from './ViewPage/ViewPage';

import './Journal.css';

function getFreeJournalId(journals: JournalType[]) {
	const maxId = Math.max(-1, ...journals.map((journal) => journal.id));
	return maxId + 1;
}

export default function Journal(): JSX.Element {
	const [journals, setJournals] = useState<JournalType[]>([]);
	const [page, setPage] = useState(
		<CreatePage handleSubmit={handleSubmit} />
	);

	// Queries
	const getJournals = useQuery('getOwnJournals', async () => {
		const data = await JournalAPI.getOwnJournals(uid);
		setJournals(data);
		return data;
	});

	useEffect(() => {
		const { data } = getJournals;
		if (data) setJournals(data);
	}, []);

	// Mutations
	const updateJournal = useMutation(
		({ id, review }: { id: number, review: string }) => {
			return JournalAPI.updateJournal(uid, { review, id });
		}
	);

	const deleteJournal = useMutation(
		({ id }: { id: number }) => {
			return JournalAPI.deleteJournal(uid, id);
		}
	);

	const { uid } = useContext(UserContext);


	function updateEntry(
		e: React.FormEvent<HTMLFormElement>,
		id: number,
		review: string
	) {
		e.preventDefault();

		updateJournal.mutate({ id, review });

		setJournals((prev) => {
			const journalCopy = prev.find((journal) => journal.id === id);
			if (journalCopy) journalCopy.review = review;
			return prev;
		});

		setPage(
			<ViewPage
				id={id}
				text={review}
				switchEditMode={switchEditMode}
				deleteEntry={deleteEntry}
			/>
		);
	}

	function deleteEntry(e: React.MouseEvent<HTMLButtonElement>, id: number) {
		e.preventDefault();

		setPage(<CreatePage handleSubmit={handleSubmit} />);

		deleteJournal.mutate({ id });

		setJournals((prev) => {
			const index = prev.findIndex((journal) => journal.id === id);
			if (index > -1) prev.splice(index, 1);
			return prev;
		});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>, review: string) {
		e.preventDefault();

		const id = getFreeJournalId(journals);

		JournalAPI.addJournal(uid, { id, review });
		setJournals((prev) => [...prev, { id, review }]);

		setPage(
			<ViewPage
				id={id}
				text={review}
				switchEditMode={switchEditMode}
				deleteEntry={deleteEntry}
			/>
		);
	}

	function switchEditMode(
		e: React.MouseEvent<HTMLButtonElement>,
		id: number,
		text: string
	) {
		e.preventDefault();

		setPage(<EditPage id={id} text={text} updateEntry={updateEntry} />);
	}

	/**
	 ** Called on 'New story' menu button
	 */
	function handleNew(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.preventDefault();

		// FIXME: using journals array index as id is not safe
		setPage(<CreatePage handleSubmit={handleSubmit} />);
	}

	function handleClick(
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
			<JournalProvider value={{ journals, setJournals, page, setPage }}>
				<JournalMenu
					journals={journals}
					handleClick={handleClick}
					handleNew={handleNew}
				/>
				{page}
				<JournalsList journals={journals} />
			</JournalProvider>
		</div>
	);
}
