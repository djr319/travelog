import * as React from 'react';
import { addNote, deleteNote } from 'Services/note.service';
import { NoteFunction, Note } from 'Types/Note.type';

const NoteContext = React.createContext<NoteFunction>({deleteNote, addNote});
const NotesContext = React.createContext<Note[]>([]);

export { NoteContext, NotesContext };
