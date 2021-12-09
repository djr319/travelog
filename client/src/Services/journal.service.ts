import { fetchRequest } from './index';
import { Journal } from 'Types/index';

const JOURNALS_URL = '/journals';

export function submitJournal(journal: Journal): Promise<Journal> {
  return fetchRequest(`${JOURNALS_URL}/submit`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(journal)
  })
}

export function getOwnJournals(uid: string): Promise<Journal[]> {
  return fetchRequest(`${JOURNALS_URL}/${uid}`);
}

export function getJournal(id: string): Promise<Journal> {
  return fetchRequest(`${JOURNALS_URL}/${id}`);
}

export function getPublicJournals(): Promise<Journal[]> {
  return fetchRequest(`${JOURNALS_URL}/collections`);
}

export function deleteJournal(id: string): Promise<void> {
  return fetchRequest(`${JOURNALS_URL}/${id}`, {
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