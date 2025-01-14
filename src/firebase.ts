
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDWK8LHTIAPcNe-NPmHEs6ANxS6sWh0uEk",
  authDomain: "hackjudge-knowcode.firebaseapp.com",
  projectId: "hackjudge-knowcode",
  storageBucket: "hackjudge-knowcode.firebasestorage.app",
  messagingSenderId: "669229869517",
  appId: "1:669229869517:web:599ad09865ea6887f63c84",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);
export { auth };

// Initialize Firestore
export const db = getFirestore(app);

