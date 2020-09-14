import firebase from 'firebase/app'
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDsFhctdXoQ71Vn9SpFZi1XV3SkdZ9LBCY",
  authDomain: "fir-crud-1a2ed.firebaseapp.com",
  databaseURL: "https://fir-crud-1a2ed.firebaseio.com",
  projectId: "fir-crud-1a2ed",
  storageBucket: "fir-crud-1a2ed.appspot.com",
  messagingSenderId: "834609989386",
  appId: "1:834609989386:web:43e97df70be76889a2dcf3",
  measurementId: "G-6QHZD5GN6Y"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();