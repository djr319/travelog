import {
  Dashboard,
  Journal,
  JournalsList,
  TripsForm,
  NavBar
} from './Components/index';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_AUTH_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_AUTH_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_AUTH_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_AUTH_MSG_SEND_ID,
  appId: process.env.REACT_APP_FIREBASE_AUTH_APP_ID
};
firebase.initializeApp(firebaseConfig);
const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

// interface User {
//   authenticated: boolean,
//   userName: string,
//   uid: string
// }

// const UserContext = React.createContext({
//   authenticated: false,
//   userName: "",
//   uid: ""
// })

export default function SignInScreen(): JSX.Element {
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
      <div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }

  // let user: User;

  // if (firebase.auth().currentUser !== null) {
  //   user.authenticated = true;
  //   user.userName = firebase.auth().currentUser.displayName;
  //   user.uid = firebase.auth().currentUser.uid
  // }

  return (

    <div>
      {/* <UserContext.Provider value={user}> */}
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
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
      {/* </UserContext.Provider > */}
    </div >
  );
}
