import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../../server/models/db";

const database = getDatabase(app);
const hotpoints = ref(database, 'hotpoints');

// Consider call this directly from component
onValue(hotpoints, (snapshot) => {
  const data = snapshot.val();
  console.log('New data!', data)
})