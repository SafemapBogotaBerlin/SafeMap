"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOldItems = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.deleteOldItems = functions.pubsub.schedule('every 1 hours').onRun(async (context) => {
    const ref = admin.database().ref('/hotpoints'); // Replace with your actual data path
    const now = Date.now();
    const cutoff = now - 8 * 60 * 60 * 1000; // 8 hours in milliseconds
    const oldItemsQuery = ref.orderByChild('added_dttm').endAt(cutoff.toString());
    const snapshot = await oldItemsQuery.once('value');
    const updates = {};
    snapshot.forEach((child) => {
        updates[child.key] = null;
    });
    return ref.update(updates);
});
//# sourceMappingURL=index.js.map