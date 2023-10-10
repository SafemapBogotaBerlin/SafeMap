"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRealTimePointModel = void 0;
const database_1 = require("firebase/database");
const db_1 = require("./db");
const database = (0, database_1.getDatabase)(db_1.app);
//const hotpoints = ref(database, 'hotpoints');
function addRealTimePointModel(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('realtime here');
        const dbRef = (0, database_1.ref)(database, 'hotpoints');
        const newPOint = (0, database_1.push)(dbRef);
        (0, database_1.set)(newPOint, data);
        /* push(dbRef, data)   // change it to .push()
            .then(() => {
                console.log('sent to Firebase Realtime Database');
            })
              .catch((error) => {
              console.error('error when sending Firebase Realtime Database: ', error);
            }); */
    });
}
exports.addRealTimePointModel = addRealTimePointModel;
//Here we're only adding points to Realtime DB to centralize process
//Subscription on information changes will be in client side
/* onValue(hotpoints, (snapshot) => {
  const data = snapshot.val();
  console.log('New data!', data)
}) */ 
//# sourceMappingURL=pointsRealTime.js.map