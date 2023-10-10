import { getDatabase, set, ref, push } from "firebase/database";
import { app } from "./db";
import { coordinates, point } from "./pointsCold";

const database = getDatabase(app);

export async function addRealTimePointModel(data: point): Promise<void> {
  console.log('realtime here')
  const dbRef = ref(database, 'hotpoints');
  const newPOint = push(dbRef);
  set(newPOint, data)
}

//Here we're only adding points to Realtime DB to centralize process
//Subscription on information changes will be in client side

/* onValue(hotpoints, (snapshot) => {
  const data = snapshot.val();
  console.log('New data!', data)
}) */