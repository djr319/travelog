import { useQuery, useMutation } from 'react-query';
import { Journal as JournalType } from 'Types/index';
import { useContext, useState, useEffect, FormEvent } from 'react';
import { UserContext } from 'Context';
import { JournalProvider } from './journal.context';

import { JournalAPI, TagsAPI } from 'Services/index';
import { JournalsList } from 'Components/index';
import JournalMenu from './JournalMenu/JournalMenu';
import { CreatePage, EditPage, ViewPage } from './index';

import './Journal.css';

function getFreeJournalId (journals: JournalType[]) {
	const maxId = Math.max(-1, ...journals.map((journal) => journal.id));
	return maxId + 1;
}

export default function Journal (): JSX.Element {
	const [ journals, setJournals ] = useState<JournalType[]>([]);
	const [ matches, setMatches ] = useState<JournalType[]>([]);
	const [ page, setPage ] = useState(
		<CreatePage handleSubmit={handleSubmit} />
	);

	const { uid } = useContext(UserContext);

	// Queries
	const getJournals = useQuery('getOwnJournals', async () => {
		const data = await JournalAPI.getOwnJournals(uid);
		setJournals(data);
		return data;
	});

	function getMatches (tags: string[]) {
		return useQuery('getMatches', async () => {
			const data = await TagsAPI.getMatchingJournals(uid, tags);
			setMatches(data);
			return data;
		});
	}

	// Mutations
	const updateJournal = useMutation(
		({ id, uid, review, tags }: { id: number; uid: string; review: string, tags: string[] }) => {
			return JournalAPI.updateJournal(uid, { review, id, tags });
		}
	);

	const deleteJournal = useMutation(({ id }: { id: number }) => {
		return JournalAPI.deleteJournal(uid, id);
	});

	useEffect(() => {
		const { data } = getJournals;
		if (data) setJournals(data);
	}, []);

	function updateEntry (
		e: FormEvent<HTMLFormElement>,
		id: number,
		review: string
	) {
		e.preventDefault();

		const tags = TagsAPI.parseTags(review);
		getMatches(tags);

		updateJournal.mutate({ id, uid, review, tags });

		setJournals((prev) => {
			const journalCopy = prev.find((journal) => journal.id === id);
			if (journalCopy) {
				journalCopy.review = review;
				journalCopy.tags = tags;
			}
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

	function deleteEntry (e: React.MouseEvent<HTMLButtonElement>, id: number) {
		e.preventDefault();

		setPage(<CreatePage handleSubmit={handleSubmit} />);

		deleteJournal.mutate({ id });

		setJournals((prev) => {
			const index = prev.findIndex((journal) => journal.id === id);
			if (index > -1) prev.splice(index, 1);
			return prev;
		});
	}

	function handleSubmit (e: React.FormEvent<HTMLFormElement>, review: string) {
		e.preventDefault();

		const id = getFreeJournalId(journals);
		const tags = TagsAPI.parseTags(review);
		getMatches(tags);

		JournalAPI.addJournal(uid, { id, review, tags });
		setJournals((prev) => [ ...prev, { id, review, tags } ]);

		setPage(
			<ViewPage
				id={id}
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

	/**
	 ** Called on 'New story' menu button
	 */
	function handleNew (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.preventDefault();

		setPage(<CreatePage handleSubmit={handleSubmit} />);
	}

	function handleClick (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: number
	) {
		e.preventDefault();

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
				<JournalsList journals={matches} />
			</JournalProvider>
		</div>
	);
}
