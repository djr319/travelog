import fetchRequest from './index';
import { Journal } from 'Types/index';

const JOURNALS_URL = '/journals';

export function addJournal(journal: Journal): Promise<void> {
  return fetchRequest(JOURNALS_URL, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(journal)
  })
}

export function getAllJournals(id: string | number): Promise<Journal[]> {
  return fetchRequest(JOURNALS_URL);
}

export function getOneJournal(id: string): Promise<Journal> {
  return fetchRequest(`${JOURNALS_URL}/${id}`);
}

export function getPublicJournals(): Promise<Journal[]> {
  return fetchRequest(`${JOURNALS_URL}/collections`);
}

export function updateJournal(id: string | number, update: Journal): Promise<Journal> {
  return fetchRequest(`${JOURNALS_URL}/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update)
  })
}

export function deleteJournal(id: string | number): Promise<void> {
  return fetchRequest(`${JOURNALS_URL}/${id}`, {
    method: 'DELETE'
  });
}

const JournalAPI = {
  addJournal,
  getAllJournals,
  getOneJournal,
  getPublicJournals,
  updateJournal,
  deleteJournal
}

export default JournalAPI