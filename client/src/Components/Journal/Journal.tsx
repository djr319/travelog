import { useQuery, useMutation } from 'react-query';
import { Journal as JournalType } from 'Types/index';
import { useContext, useState, useEffect, FormEvent } from 'react';
import { UserContext } from 'Context';
import { JournalProvider } from './journal.context';

import { JournalAPI, TagsAPI } from 'Services/index';
import { JournalsList } from 'Components';
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
		id: number,
		review: string,
		photoURL: string
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

		setPage(
			<ViewPage
				id={id}
				text={review}
				photoURL={photoURL}
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
      return prev.filter((journal) => {
        journal.id !== id
      });
    });
	}

	function handleSubmit (
		e: React.FormEvent<HTMLFormElement>,
		review: string,
		photoURL: string
	) {
		console.log(review, photoURL);
		e.preventDefault();

		const id = getFreeJournalId(journals);
		const tags = TagsAPI.parseTags(review);
		TagsAPI.getMatchingJournals(uid, tags).then((matches) =>
			setMatches(matches)
		);

		JournalAPI.addJournal(uid, { id, review, photoURL, tags });
		setJournals((prev) => [ ...prev, { id, review, photoURL, tags } ]);
		setPage(
			<ViewPage
				id={id}
				text={review}
				photoURL={photoURL}
				switchEditMode={switchEditMode}
				deleteEntry={deleteEntry}
			/>
		);
	}

	function switchEditMode (
		e: React.MouseEvent<HTMLButtonElement>,
		id: number,
		text: string,
		photoURL: string
	) {
		e.preventDefault();

		setPage(
			<EditPage
				id={id}
				text={text}
				photoURL={photoURL}
				updateEntry={updateEntry}
			/>
		);
	}

	/**
   ** Called on 'New story' menu button
   */
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

		const journal = journals.find((journal) => journal.id === id);

		if (journal === undefined) return;
		TagsAPI.getMatchingJournals(uid, journal.tags).then((matches) =>
			setMatches(matches)
		);
		console.log(journal.review, journal.photoURL);
		setPage(
			<ViewPage
				id={journal.id}
				text={journal.review}
				photoURL={journal.photoURL}
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
