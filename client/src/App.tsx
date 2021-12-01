import {
  Dashboard,
  Journal,
  TripsForm,
  NavBar
} from 'Components';

import { UserProvider } from 'Context';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { User } from 'Types';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FirebaseAuth, { auth } from 'Components/FirebaseAuth/FirebaseAuth';

// firebase config

export default function App(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <FirebaseAuth />
    );
  }

  const user: User = {
    authenticated: false,
    userName: '',
    uid: '',
    photoURL: '',
  };

  const maybeUser = auth.currentUser;

  if (maybeUser !== null) {
    user.authenticated = true;
    user.userName = maybeUser.displayName || '';
    user.uid = maybeUser.uid;
    user.photoURL = maybeUser.photoURL || '';
  }

  return (

    <div>
      <UserProvider value={user}>
        <a onClick={() => auth.signOut()}>Sign-out</a>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path="/trips" element={<TripsForm />} />
            {/*
          <Route path="/profile" element={<Dashboard />} />
          <Route path="/planning" element={<Dashboard />} />
          <Route path="/notes" element={<Dashboard />} />
          <Route path="/route" element={<Dashboard />} />
          <Route path="/weather" element={<Dashboard />} />
          <Route path="/logout" element={<Dashboard />} />
          */}
            <Route path='journal' element={<Journal />} />
            <Route
              path='*'
              element={
                <main style={{ padding: '1rem' }}>
                  <p>We've wandered off the beaten track. Nothing here!</p>
                  <p>{"User: " + firebase.auth().currentUser?.displayName}</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider >
    </div >
  );
}
