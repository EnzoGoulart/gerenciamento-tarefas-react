import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDyk19MPRQQ9ilKNwKUWN9CZ8r4-kSZHjA",
  authDomain: "curso-e0f49.firebaseapp.com",
  projectId: "curso-e0f49",
  storageBucket: "curso-e0f49.appspot.com",
  messagingSenderId: "807828229173",
  appId: "1:807828229173:web:82bd017c67410ab2a4b57c",
  measurementId: "G-C1WKLFP6KC",
};

const fApp = initializeApp(firebaseConfig);
const db = getFirestore(fApp);
const auth = getAuth(fApp)
export { db, auth };
