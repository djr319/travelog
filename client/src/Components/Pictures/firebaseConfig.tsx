import "firebase/storage";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDqD5GpJJmSyg5DFUpsn-FGZf2Obt3S5NM",
  authDomain: "travelog-bf015.firebaseapp.com",
  projectId: "travelog-bf015",
  storageBucket: "travelog-bf015.appspot.com",
  messagingSenderId: "461923860359",
  appId: "1:461923860359:web:a28714532ba27210669d22",
};
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export { storage };
