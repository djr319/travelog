import { Journal, Trip } from 'Types';
export { default as JournalAPI } from './journal.service';
export { default as TripsAPI } from './trips.service';

const BASE_URL = 'http://localhost:3001'

type AnyVal = Journal | Journal[] | Trip | Trip[];

export default async function fetchRequest(url: string, options?: RequestInit): Promise<AnyVal> {
  return await fetch(`${BASE_URL}${url}`, options)
    .then(response => response.json())
    .catch((err) => console.log(err));
}