import { fetchRequest } from 'Services';
import { Note } from 'Types';

const NOTES_URL = '/notes';

export function addNote (uid: string, note: string): Promise<Note> {
  return fetchRequest(`${NOTES_URL}/${uid}`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({note})
  })
}

export function getPersonalNotes (uid: string): Promise<Note[]> {
  return fetchRequest(`${NOTES_URL}/${uid}`);
}

export function deleteNote (uid: string, noteId: number): Promise<void> {
  return fetchRequest(`${NOTES_URL}/${uid}/${noteId}`, {
    method: 'DELETE'
  });
}

const NoteAPI = {
  addNote,
  getPersonalNotes,
  deleteNote
}

export default NoteAPI;
