import { fetchRequest } from './index';
import { Journal } from 'Types/index';

const JOURNALS_URL = '/journals';

export function submitJournal(uid: string, journal: Journal): Promise<Journal> {
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

export function deleteJournal(uid: string, id: string | number): Promise<void> {
  return fetchRequest(`${JOURNALS_URL}/${uid}/${id}`, {
    method: 'DELETE'
  });
}

const JournalAPI = {
  submitJournal,
  getOwnJournals,
  getJournal,
  getPublicJournals,
  deleteJournal
}

export default JournalAPI