import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const deleteOldItems = functions.pubsub.schedule('every 1 hours').onRun(async (context: functions.EventContext) => {
  const ref = admin.database().ref('/hotpoints');
  const now = Date.now();
  const cutoff = now - 8 * 60 * 60 * 1000; // 8 hours in milliseconds
  const oldItemsQuery = ref.orderByChild('added_dttm').endAt(cutoff);
  const snapshot = await oldItemsQuery.once('value');
  const updates: Record<string, null> = {};
  snapshot.forEach((child: admin.database.DataSnapshot) => {
      updates[child.key as string] = null;
  });

  return ref.update(updates);
});