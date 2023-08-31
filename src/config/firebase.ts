// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTOWMkAnQJWNkmfEueHA6q25tHWYzruPA",
  authDomain: "react-socialmedia-662da.firebaseapp.com",
  projectId: "react-socialmedia-662da",
  storageBucket: "react-socialmedia-662da.appspot.com",
  messagingSenderId: "28208937210",
  appId: "1:28208937210:web:3f61cfe0891835cb027143"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);