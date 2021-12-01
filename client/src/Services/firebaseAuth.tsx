import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
// import { User } from 'Types';
import { Dashboard, NavBar } from 'Components';

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

export const auth = firebase.auth();

// // --------

type FirebaseAuthProps = {
  authService: firebase.auth.Auth;
  setAuthService: Dispatch<SetStateAction<firebase.auth.Auth>>;
  setSignedIn: Dispatch<SetStateAction<boolean>>;
}

export default function FirebaseAuth(
  { authService, setAuthService, setSignedIn }: FirebaseAuthProps) {

  // Listen to the Firebase Auth state and set the local state.


  // logged out render
  return (
    <div>
      {/* <Login /> */}
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authService} />
      <Dashboard />
    </div>
  );

  // return (<div>Some text we don't want to see</div>);
}
