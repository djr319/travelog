import './Notes.css';
import { useContext, useState } from 'react';
import { UserContext } from 'Context';
import { NoteContext, NotesContext } from './../../Context/Context';

function Notes (): JSX.Element {

  const [note, setNote] = useState('');
  // const [id, setId] = useState(9); // Not needed as db is giving id automatically
  const [createdAt, setCreatedAt] = useState(new Date());
  const { uid } = useContext(UserContext);
  const { addNote, deleteNote } = useContext(NoteContext);
  const notes = useContext(NotesContext);

  function handleAddNote (e: React.SyntheticEvent) {
    e.preventDefault();
    addNote(uid, {note, createdAt, uid});
    setNote('');
  }

  function handleDeleteNote (id: number | undefined) {
    id && deleteNote(uid, id);
  }

  return (
    <div className="notes-container">
      <div className="notes-published">
        <div className="notes-list">
          {notes.map(note => (<div className="note-item" key={note.id}>
          {note.note}
          <button className="delete-note" onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>))}
        </div>
      </div>
      <form className="notes-add" onSubmit={handleAddNote}>
        <input className="notes-input" type="text" placeholder="Enter notes..." onChange={(e) => setNote(e.target.value)}></input>
        <button className="add-note">Add</button>
      </form>
    </div>
  )
}

export default Notes;
