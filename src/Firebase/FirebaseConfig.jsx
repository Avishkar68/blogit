import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuIFC26m7jvjAf-qJ_5DzNRQHgrN77gpM",
  authDomain: "blogit-77826.firebaseapp.com",
  projectId: "blogit-77826",
  storageBucket: "blogit-77826.appspot.com",
  messagingSenderId: "626175023917",
  appId: "1:626175023917:web:78c3b47d18c05729ea11a4"
};

const app = initializeApp(firebaseConfig);

const FireDb = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {FireDb , auth , storage}