import { getDatabase, set, ref, onValue } from "firebase/database";
import { app } from "./db";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { coordinates, point } from "./pointsCold";

const database = getDatabase(app);
const hotpoints = ref(database, 'hotpoints');

export async function addRealTimePointModel(data: point): Promise<void> {
  console.log('realtime here')
  const dbRef = ref(database, 'hotpoints');
    set(dbRef, data)
      .then(() => {
          console.log('sent to Firebase Realtime Database');
      })
        .catch((error) => {
        console.error('error when sending Firebase Realtime Database: ', error);
      });
}

onValue(hotpoints, (snapshot) => {
  const data = snapshot.val();
  console.log('New data!', data)
})