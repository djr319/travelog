import { fetchRequest } from 'Services';
import { Note } from 'Types/index';

const NOTES_URL = '/notes';

export function addNote (note: Note): Promise<Note> {
  return fetchRequest(NOTES_URL, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
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
