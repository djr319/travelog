import "./App.css";
import { useState, useEffect } from 'react';
import NavBar from "Components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { Note } from 'Types/index';
import { NoteAPI } from 'Services/index';
import { NoteContext, NotesContext } from './Context/Context';
import Notes from './Components/Notes/Notes';

export default function App(): JSX.Element {

  const [notes, setNotes] = useState<Note[]>([]);
  const [id, setId] = useState(1); // Need to be changed once we have functional auth

  useEffect(() => {
    (async () => {
      const notes = await NoteAPI.getPersonalNotes(id);
      const sortedNotes = notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setNotes(sortedNotes);
    })();
	}, []);
  
  function addNote (note: Note): void {
    NoteAPI.addNote(note)
      .then(newNote => setNotes([...notes, newNote]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      ));
  }

  async function deleteNote (id: number): Promise<void> {
    await NoteAPI.deleteNote(id);
    const filteredNotes = notes.filter(note => note.id !== id);
    setNotes(filteredNotes);
  }

  return (
    <div className="App">
      <NoteContext.Provider value={{deleteNote, addNote}} >
      <NotesContext.Provider value={notes} >
        <NavBar />
        <Notes />
        <Outlet />
      </NotesContext.Provider>
      </NoteContext.Provider>
    </div>
  );
}
