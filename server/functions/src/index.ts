import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
export const deleteNewPoint8Hours = functions.database
  .ref("/hotpoints/{pushId}")
  .onCreate((snapshot, context) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {added_dttm} = snapshot.val();
    const pushId = context.params.pushId;
    const addedTime = JSON.parse(added_dttm);
    const currentTime = Date.now();
    const eightHoursInMillis = 8 * 60 * 60 * 1000;
    const timeDifference = currentTime - addedTime;
    const remainingTime = Math.min(eightHoursInMillis - timeDifference, eightHoursInMillis);
    const refPath = `/hotpoints/${pushId}`;
    const databaseRef = admin.database().ref(refPath);
    setTimeout(() => {
      databaseRef.remove()
        .then(() => {
          console.log(`Point with ID: ${pushId} deleted successfully.`);
        })
        .catch((error) => {
          console.error(`Error deleting point with ID: ${pushId}`, error);
        });
    }, remainingTime);
    return null;
  });

