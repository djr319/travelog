import { useQuery, useMutation } from 'react-query';
import { Journal as JournalType } from 'Types/index';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from 'Context';

import { JournalAPI, TagsAPI } from 'Services/index';
import { JournalsList } from 'Components';
import { JournalPage, JournalMenu } from './index';

import './Journal.css';

function getFreeJournalId (journals: JournalType[], uid: string) {
	const nextNum = Math.max(
		...journals
			.filter((journal) => journal.id.startsWith(uid))
			.map((journal) => {
				const match = journal.id.match(/\d+$/);
				if (match) return Number(match[0]);
				return 0;
			})
	);
	return `${uid}_${nextNum + 1}`;
}

export default function Journal (): JSX.Element {
	const [ journals, setJournals ] = useState<JournalType[]>([]);
	const [ matches, setMatches ] = useState<JournalType[]>([]);

	const { uid } = useContext(UserContext);
	const emptyJournal = {
		id: getFreeJournalId(journals, uid),
		uid,
		photoURL: '',
		review: '',
		tags: []
	};
	const [ selection, setSelection ] = useState<JournalType>(emptyJournal);

	// Queries
	const getJournals = useQuery('getOwnJournals', async () => {
		const data = await JournalAPI.getOwnJournals(uid);
		setJournals(data);
		return data;
	});

	// Mutations
	const updateJournal = useMutation(
		({ id, uid, review, photoURL, tags }: JournalType) => {
			return JournalAPI.submitJournal(uid, { uid, review, id, photoURL, tags });
		}
	);

	const deleteJournal = useMutation(({ id }: { id: string }) => {
		return JournalAPI.deleteJournal(uid, id);
	});

	useEffect(() => {
		const { data } = getJournals;
		if (data) setJournals(data);
	}, []);

	function deleteEntry (e: React.MouseEvent<HTMLButtonElement>, id: string) {
		e.preventDefault();

		deleteJournal.mutate({ id });

		setJournals((prev) => {
			return prev.filter((journal) => journal.id !== id);
		});
		setSelection({ ...emptyJournal });
	}

	function handleSubmit ({ id, uid, review, photoURL }: JournalType) {
		const tags = TagsAPI.parseTags(review);
		TagsAPI.getMatchingJournals(uid, tags).then((matches) =>
			setMatches(matches)
		);

		const newJournal = { id, uid, review, photoURL, tags };
		setSelection(newJournal);
		updateJournal.mutate(newJournal);

		const alreadyInList =
			journals.findIndex((journal) => journal.id === id) !== -1;

		setJournals((prev) => {
			if (alreadyInList) {
				return prev.map((journal) => {
					if (journal.id === id) {
						return { ...newJournal };
					}
					return journal;
				});
			}
			return [ ...prev, newJournal ];
		});
	}

	/**
   ** Called on 'New story' menu button
   */
	function handleNew (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.preventDefault();

		setSelection({ ...emptyJournal });
	}

	function handleClick (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: string
	) {
		e.preventDefault();
		const journal = journals.find(
			(journal) => journal.id === id
		) as JournalType;

		TagsAPI.getMatchingJournals(uid, journal.tags).then((matches) =>
			setMatches(matches)
		);
		setSelection(journal);
	}

	return (
		<div className='journal'>
				<JournalMenu
					journals={journals}
					handleClick={handleClick}
					handleNew={handleNew}
				/>
				<JournalPage
					journal={selection}
					handleSubmit={handleSubmit}
					deleteEntry={deleteEntry}
				/>
				<JournalsList journals={matches} />
		</div>
	);
}
