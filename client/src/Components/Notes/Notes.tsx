import './Notes.css';
import { NoteAPI} from 'Services';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from 'Context';
import { Note } from 'Types';

function Notes (): JSX.Element {

  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const { uid } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const notes = await NoteAPI.getPersonalNotes(uid);
      const sortedNotes = notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setNotes(sortedNotes);
    })();
	}, []);

  function addNote (uid: string, note: string): void {
    NoteAPI.addNote(uid, note)
      .then(newNote => setNotes([...notes, newNote]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      ));
  }

  async function deleteNote (uid: string, id: number): Promise<void> {
    await NoteAPI.deleteNote(uid, id);
    const filteredNotes = notes.filter(note => note.id !== id);
    setNotes(filteredNotes);
  }

  function handleAddNote (e: React.SyntheticEvent) {
    e.preventDefault();
    addNote(uid, note);
    setNote('');
  }

  function handleDeleteNote (id: number) {
    return deleteNote(uid, id);
  }
  console.log('NOTES: ', notes)
  return (
    <div className="notes-container">
      <div className="notes-published">
        <div className="notes-list">
          {notes.length && notes.map(note => (<div className="note-item" key={note.id}>
          {note.note}
          <button className="delete-note" onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>))}
        </div>
      </div>
      <form className="notes-add" onSubmit={handleAddNote}>
        <input className="notes-input" type="text" placeholder="Enter notes..." value={note} onChange={(e) => setNote(e.target.value)}></input>
        <button className="add-note">Add</button>
      </form>
    </div>
  )
}

export default Notes;
