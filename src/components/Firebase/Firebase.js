import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjIR8cLgFhLOzOl2Odw3ELy2RxWVdx0vA",
  authDomain: "library-3b0b9.firebaseapp.com",
  projectId: "library-3b0b9",
  storageBucket: "library-3b0b9.appspot.com",
  messagingSenderId: "82009430364",
  appId: "1:82009430364:web:dbe8ff0d307f7c569a8999",
  measurementId: "G-07E7Q6JEHJ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export default app;
