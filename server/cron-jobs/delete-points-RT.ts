import cron from 'node-cron';
import { app } from '../models/db';
import { getDatabase, ref, remove, onValue } from 'firebase/database';

const database = getDatabase(app);
const hotpointsRef = ref(database, 'hotpoints');

cron.schedule('* * * * *', () => {
  const eightHoursAgo = Date.now() - 8 * 60 * 60 * 1000;

  onValue(hotpointsRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const point = childSnapshot.val();
      const addedTime = JSON.parse(point.added_dttm);

      if (addedTime < eightHoursAgo) {
        remove(childSnapshot.ref);

        console.log(
          `Point with ID: ${childSnapshot.key} deleted successfully.`
        );
      }
    });
  });
});
