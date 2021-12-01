export { default as JournalAPI } from './journal.service';

const BASE_URL = 'http://localhost:3001'

export default async function fetchRequest(url: string, options?: RequestInit): Promise<any> {
  return await fetch(`${BASE_URL}${url}`, options)
    .then(response => response.json())
    .catch((err) => console.log(err));
}