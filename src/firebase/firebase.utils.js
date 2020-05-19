import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAPWPHcsOWyWVDGFrt-YqYByoXbXNVGB0I',
  authDomain: 'crwn-db-a3c28.firebaseapp.com',
  databaseURL: 'https://crwn-db-a3c28.firebaseio.com',
  projectId: 'crwn-db-a3c28',
  storageBucket: 'crwn-db-a3c28.appspot.com',
  messagingSenderId: '233115233448',
  appId: '1:233115233448:web:56833d38a9e6763ae9a69d',
  measurementId: 'G-RK2MV6JGQB',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
