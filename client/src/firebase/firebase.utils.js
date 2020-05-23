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

// Use to add data to database
export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  // use batch so if one request fails, the whole operation will fail, helps with data consistency
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // .doc() gives new doc ref with randomly generated id, because no arg is passed in
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};

// We are simulating an environment where there is no firebase backend,
// in reality we could just use onAuthStatechanged subscription in compDidMount of App.js to check if the person
// is authenticated, but in this case we are handling ourselves using saga and we need a promise
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
