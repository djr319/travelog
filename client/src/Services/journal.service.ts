import { fetchRequest } from './index';
import { Journal } from 'Types/index';

const JOURNALS_URL = '/journals';

export function addJournal(uid: string, journal: Journal): Promise<Journal> {
  return fetchRequest(`${JOURNALS_URL}/${uid}`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(journal)
  })
}

export function getOwnJournals(uid: string): Promise<Journal[]> {
  return fetchRequest(`${JOURNALS_URL}/${uid}`);
}

export function getJournal(uid: string, id: string): Promise<Journal> {
  return fetchRequest(`${JOURNALS_URL}/${uid}/${id}`);
}

export function getPublicJournals(): Promise<Journal[]> {
  return fetchRequest(`${JOURNALS_URL}/collections`);
}

export function updateJournal(uid: string, update: Journal): Promise<Journal> {
  return fetchRequest(`${JOURNALS_URL}/${uid}/${update.id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update)
  })
}

export function deleteJournal(uid: string, id: string | number): Promise<void> {
  return fetchRequest(`${JOURNALS_URL}/${uid}/${id}`, {
    method: 'DELETE'
  });
}

const JournalAPI = {
  addJournal,
  getOwnJournals,
  getJournal,
  getPublicJournals,
  updateJournal,
  deleteJournal
}

export default JournalAPI