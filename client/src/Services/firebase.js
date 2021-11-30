
import firebase from "firebase/compat/app";
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

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
// -------------------------





// import { initializeApp } from 'firebase/app';
// import * as dotenv from "dotenv";
// // var firebase = require('firebase');
// // var firebaseui = require('firebaseui');
// import firebase from 'Services/firebase';
// import firebaseui from 'firebaseui'
// // import { } from 'firebase/<service>';

// dotenv.config();




// const auth = app.auth();
// // const db = app.firestore();

// const ui = new firebaseui.auth.AuthUI(firebase.auth());

// const googleProvider = new firebase.auth.GoogleAuthProvider();
// const signInWithGoogle = async () => {
//   try {
//     const res = await auth.signInWithPopup(googleProvider);
//     const user = res.user;
//     const query = await db
//       .collection("users")
//       .where("uid", "==", user.uid)
//       .get();
//     if (query.docs.length === 0) {
//       await db.collection("users").add({
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };


// // Is there an email link sign-in?
// if (ui.isPendingRedirect()) {
//   ui.start('#firebaseui-auth-container', uiConfig);
// }

// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     {
//       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
//     }
//   ],
//   // Other config options...
// });

// <div id="firebaseui-auth-container"></div>
