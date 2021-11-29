export { default as JournalAPI } from './journal.service';

const BASE_URL = 'http://localhost:3001'

export default function fetchRequest(url: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${url}`, options);
}