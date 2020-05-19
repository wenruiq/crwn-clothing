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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if not logged in, return
  if (!userAuth) return;

  // if not take a document snapshot using the auth id
  // create a document reference first, we use auth id as id of the document here
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // take snapshot of reference using .get()
  const snapShot = await userRef.get();

  // if id doesnt exist in document snapshot, create it in the document
  if (!snapShot.exists) {
    // get data we want from userAuth object
    const { displayName, email } = userAuth;
    // get date
    const createdAt = new Date();

    // 
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }
  
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
