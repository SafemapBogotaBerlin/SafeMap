import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase.config';

export const firestore: Firestore = getFirestore(app);

export const database = getDatabase(app);
export const hotpoints = ref(database, 'hotpoints');

// Consider call this directly from component

onValue(hotpoints, (snapshot) => {
  const data = snapshot.val();
});
