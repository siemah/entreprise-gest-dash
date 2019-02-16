import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: "AIzaSyA3Iz-yg1T6gSDYYD29UaB-Zt3991KtOvc",
  authDomain: "reactmap-199117.firebaseapp.com",
  databaseURL: "https://reactmap-199117.firebaseio.com",
  projectId: "reactmap-199117",
  storageBucket: "reactmap-199117.appspot.com",
  messagingSenderId: "61492096004"
});

firebase.firestore().settings({cacheSizeBytes: 1048576})
firebase.storage();

export default firebase;
