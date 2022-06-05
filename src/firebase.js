import app from 'firebase/app'
import 'firebase/firestore'
import  'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAPyI4OtG3hPtcP7CYcUin5VB4bXRQYQYA",
  authDomain: "parcial-final-79d1e.firebaseapp.com",
  projectId: "parcial-final-79d1e",
  storageBucket: "parcial-final-79d1e.appspot.com",
  messagingSenderId: "213395101784",
  appId: "1:213395101784:web:7f74182315137b7b8d922d"
};
  // Initialize Firebase
  app.initializeApp(firebaseConfig);
  const db = app.firestore;
  const auth = app.auth;
  export{db,auth}