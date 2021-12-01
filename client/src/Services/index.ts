export { default as JournalAPI } from './journal.service';
export { default as TripsAPI } from './trips.service';
export { default as FirebaseAPI } from './firebase.service';

const BASE_URL = 'http://localhost:3001'

export default async function fetchRequest<T>(url: string, options?: RequestInit): Promise<T> {
  return await fetch(`${BASE_URL}${url}`, options)
    .then(response => response.json())
    .catch((err) => console.log(err));
}