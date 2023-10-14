import { Firestore, getFirestore } from 'firebase/firestore';

import { getDatabase, ref, onValue, get } from 'firebase/database';
import { app } from '../firebase.config';

export const firestore: Firestore = getFirestore(app);

export const database = getDatabase(app);
export const hotpoints = ref(database, 'hotpoints');

// Consider call this directly from component

onValue(hotpoints, (snapshot) => {
  const data = snapshot.val();
});

export async function getActivePoints () {
  try {
    const snapshot = await get(hotpoints);
    if (snapshot.exists()) {
      let numberOfPoints = 0;
      snapshot.forEach((childSnapshot) => {
        numberOfPoints++;
      });
      return numberOfPoints;
    } else {
      console.log("No points");
      return 0; 
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
}