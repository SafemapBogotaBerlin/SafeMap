import { getDatabase, ref } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAM2TYDpwTfII_E1vCpVcFgRH5kNcAokDE',
  authDomain: 'safemap-330e2.firebaseapp.com',
  projectId: 'safemap-330e2',
  storageBucket: 'safemap-330e2.appspot.com',
  messagingSenderId: '1073813292870',
  appId: '1:1073813292870:web:e88e28d65b0168430e4747',
  measurementId: 'G-8HXEDLS40G',
};

const app = initializeApp(firebaseConfig);
export const firestore:Firestore = getFirestore(app);

export const database = getDatabase(app);
export const hotpoints = ref(database, 'hotpoints');

// Consider call this directly from component

// onValue(hotpoints, (snapshot) => {
//   // const data = snapshot.val();
//   //console.log('New data!', data);
// });
