import { useQuery, useMutation } from 'react-query';
import { Journal as JournalType } from 'Types/index';
import { useContext, useState, useEffect, FormEvent } from 'react';
import { UserContext } from 'Context';
import { JournalProvider } from './journal.context';

import { JournalAPI, TagsAPI } from 'Services/index';
import { JournalsList } from 'Components';
import JournalMenu from './JournalMenu/JournalMenu';
import JournalPage from './JournalPage';

import './Journal.css';

function getFreeJournalId (journals: JournalType[]) {
	const maxId = Math.max(-1, ...journals.map((journal) => journal.id));
	return maxId + 1;
}

export default function Journal (): JSX.Element {
	const [ journals, setJournals ] = useState<JournalType[]>([]);
	const [ matches, setMatches ] = useState<JournalType[]>([]);

	const emptyJournal = {
		id: getFreeJournalId(journals),
		photoURL: '',
		review: '',
		tags: []
	};
	const [ selection, setSelection ] = useState<JournalType>(emptyJournal);

	const { uid } = useContext(UserContext);

	// Queries
	const getJournals = useQuery('getOwnJournals', async () => {
		const data = await JournalAPI.getOwnJournals(uid);
		setJournals(data);
		return data;
	});

	// Mutations
	const updateJournal = useMutation(
		({
			id,
			uid,
			review,
			photoURL,
			tags
		}: {
			id: number;
			uid: string;
			review: string;
			photoURL: string;
			tags: string[];
		}) => {
			return JournalAPI.updateJournal(uid, { review, id, photoURL, tags });
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
		{ id, review, photoURL }: JournalType
	) {
		e.preventDefault();

		const tags = TagsAPI.parseTags(review);
		TagsAPI.getMatchingJournals(uid, tags).then((matches) =>
			setMatches(matches)
		);

		updateJournal.mutate({ id, uid, review, photoURL, tags });

		setJournals((prev) => {
			return prev.map((journal) => {
				if (journal.id === id) {
					const journalCopy = { ...journal };
					journalCopy.review = review;
					journalCopy.photoURL = photoURL;
					return journalCopy;
				}
				return journal;
			});
		});
	}

	function deleteEntry (e: React.MouseEvent<HTMLButtonElement>, id: number) {
		e.preventDefault();

		deleteJournal.mutate({ id });

		setJournals((prev) => {
			return prev.filter((journal) => {
				journal.id !== id;
			});
		});
		setSelection({ ...emptyJournal });
	}

	function handleSubmit (review: string, photoURL: string) {
		const id = getFreeJournalId(journals);
		const tags = TagsAPI.parseTags(review);
		TagsAPI.getMatchingJournals(uid, tags).then((matches) =>
			setMatches(matches)
		);

		const newJournal = { id, review, photoURL, tags };
		JournalAPI.addJournal(uid, newJournal);
		setJournals((prev) => [ ...prev, newJournal ]);
		setSelection(newJournal);
	}

	/**
   ** Called on 'New story' menu button
   */
	function handleNew (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.preventDefault();

		setSelection(emptyJournal);
	}

	function handleClick (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: number
	) {
		e.preventDefault();

		const journal = journals.find((journal) => journal.id === id);

		if (journal === undefined) return;

		TagsAPI.getMatchingJournals(uid, journal.tags).then((matches) =>
			setMatches(matches)
		);
		setSelection(journal);
	}

	return (
		<div className='journal'>
			<JournalProvider value={{ journals, setJournals }}>
				<JournalMenu
					journals={journals}
					handleClick={handleClick}
					handleNew={handleNew}
				/>
				<JournalPage
					journal={selection}
					handleSubmit={handleSubmit}
					updateEntry={updateEntry}
					deleteEntry={deleteEntry}
				/>
				<JournalsList journals={matches} />
			</JournalProvider>
		</div>
	);
}
