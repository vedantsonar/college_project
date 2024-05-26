// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ7yLre5GC3wISbrhNkX-WAIxAkuSxrxY",
  authDomain: "college-project-16068.firebaseapp.com",
  databaseURL: "https://college-project-16068-default-rtdb.firebaseio.com",
  projectId: "college-project-16068",
  storageBucket: "college-project-16068.appspot.com",
  messagingSenderId: "323322274473",
  appId: "1:323322274473:web:96a54ce321ccd169fbffb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;