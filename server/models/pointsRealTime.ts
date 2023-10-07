import { getDatabase, set, ref } from "firebase/database";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { coordinates, point } from "./pointsCold";

const database = getDatabase();

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