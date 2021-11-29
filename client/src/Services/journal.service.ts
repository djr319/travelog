import fetchRequest from './index';
import { Journal } from 'Types/index';

export function addJournal(journal: Journal) {
  return fetchRequest('/journal', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(journal)
  })
}