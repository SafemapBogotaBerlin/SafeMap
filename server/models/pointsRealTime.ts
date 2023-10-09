import { getDatabase, set, ref } from "firebase/database";
import { app } from "../../server/models/db";
//import { getFirestore, collection, addDoc } from "firebase/firestore";
import { coordinates, point } from "../../server/models/pointsCold";

const database = getDatabase(app);
//const hotpoints = ref(database, 'hotpoints');

export async function addRealTimePointModel(data: point): Promise<void> {
  console.log('realtime here')
  const dbRef = ref(database, 'hotpoints');
    set(dbRef, data)   // change it to .push()
      .then(() => {
          console.log('sent to Firebase Realtime Database');
      })
        .catch((error) => {
        console.error('error when sending Firebase Realtime Database: ', error);
      });
}

//Here we're only adding points to Realtime DB to centralize process

//Subscription on information changes will be in client side

/* onValue(hotpoints, (snapshot) => {
  const data = snapshot.val();
  console.log('New data!', data)
}) */