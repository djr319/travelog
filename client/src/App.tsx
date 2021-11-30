import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  // apiKey: process.env.FIREBASE_AUTH_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_AUTH_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_AUTH_BUCKET,
  // messagingSenderId: process.env.FIREBASE_AUTH_MSG_SEND_ID,
  // appId: process.env.FIREBASE_AUTH_APP_ID

  apiKey: "AIzaSyDqD5GpJJmSyg5DFUpsn-FGZf2Obt3S5NM",
  authDomain: "travelog-bf015.firebaseapp.com",
  projectId: "travelog-bf015",
  storageBucket: "travelog-bf015.appspot.com",
  messagingSenderId: "461923860359",
  appId: "1:461923860359:web:a28714532ba27210669d22"

};
firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function SignInScreen(): JSX.Element {
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
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  console.log("User: ", firebase.auth().currentUser);
  // https://stackoverflow.com/questions/62269436/firebase-and-react-object-is-possibly-null-ts2531
  // https://firebase.google.com/docs/reference/js/auth.user


  return (
    <div>
      <h1>My App</h1>
      <p>Welcome back, {firebase.auth().currentUser?.displayName}</p>

      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
    </div>
  );
}
export default SignInScreen;


// import Login from './Components/LoginButton/LoginButton';
// import NavBar from 'Components/NavBar/NavBar';
// import { Outlet } from 'react-router-dom';
// // import firebase from './Services/firebase';

// import React from 'react';

// // https://github.com/firebase/firebaseui-web-react
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';

// import './App.css';


// firebase.initializeApp(config);

// // Configure FirebaseUI.
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'popup',
//   // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//   signInSuccessUrl: '/signedIn',
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//   ],
// };


// function SignInScreen() {
//   return (
//     <div>
//       <h1>My App</h1>
//       <p>Please sign-in:</p>
//       <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
//     </div>
//   );
// }

// export default SignInScreen







// import { useState, useEffect } from 'react';

// export default function App(): JSX.Element {

//   // Authentication
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     firebase.auth().onAuthStateChanged(user => {
//       setUser(user);
//     })
//   }, [])

//   console.log(user);


//   return (
//     <div>
//       <Login />
//       <NavBar />
//       <Outlet />
//     </div>
//   );
// }
