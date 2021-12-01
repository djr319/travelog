import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { User } from 'Types';

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

function getConfig() {
  return {
    auth: firebase.auth(),
    uiConfig
  }
}

function formatUser(auth: firebase.auth.Auth) {
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

  return user;
}

const FirebaseApi = {
  getConfig,
  formatUser
}

export default FirebaseApi;
