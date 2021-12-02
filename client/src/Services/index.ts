
export { default as JournalAPI } from './journal.service';
export { default as NoteAPI} from './note.service';
export { default as TripsAPI } from './trips.service';
export { default as FirebaseAPI } from './firebase.service';
export { default as UserAPI } from './user.service';
export { default as ProfileAPI } from "./profile.service";


const BASE_URL = "http://localhost:3001";

export async function fetchRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  return await fetch(`${BASE_URL}${url}`, options)
    .then((response) => response.json())
    .catch((err) => console.log(err));
}
