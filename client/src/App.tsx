import {
  Dashboard,
  Journal,
  TripsForm,
  NavBar, 
  Notes
} from 'Components';

import { Note } from 'Types/index';
import { NoteAPI } from 'Services/index';
import { NoteContext, NotesContext } from './Context/Context';
// import Notes from './Components/Notes/Notes';

import { UserProvider } from 'Context';
import 'firebase/compat/auth';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FirebaseAPI } from 'Services';
import { StyledFirebaseAuth } from 'react-firebaseui';


export default function App(): JSX.Element {

  const { auth, uiConfig } = FirebaseAPI.getConfig();

  const [notes, setNotes] = useState<Note[]>([]);
  const [id, setId] = useState(1); // Need to be changed once we have functional auth

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);


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


  

  if (!isSignedIn) {
    return (
      <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      <Dashboard />
    </div>
    );
  }

  const user = FirebaseAPI.formatUser(auth);
  
  return (

    <div>
      <UserProvider value={user}>
        <a onClick={() => auth.signOut()}>Sign-out</a>
      <NoteContext.Provider value={{deleteNote, addNote}} >
      <NotesContext.Provider value={notes} > 
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path="/trips" element={<TripsForm />} />
            {/*
          <Route path="/profile" element={<Dashboard />} />
          <Route path="/planning" element={<Dashboard />} />
          <Route path="/route" element={<Dashboard />} />
          <Route path="/weather" element={<Dashboard />} />
          <Route path="/logout" element={<Dashboard />} />
        */}
            <Route path='journal' element={<Journal />} />
            <Route path="/notes" element={<Notes />} />
            <Route
              path='*'
              element={
                <main style={{ padding: '1rem' }}>
                  <p>We've wandered off the beaten track. Nothing here!</p>
                  <p>{"User: " + auth.currentUser?.displayName}</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </NotesContext.Provider>
      </NoteContext.Provider>
      </UserProvider >
    </div >
  );
}