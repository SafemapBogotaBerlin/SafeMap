"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyAM2TYDpwTfII_E1vCpVcFgRH5kNcAokDE",
    authDomain: "safemap-330e2.firebaseapp.com",
    projectId: "safemap-330e2",
    storageBucket: "safemap-330e2.appspot.com",
    messagingSenderId: "1073813292870",
    appId: "1:1073813292870:web:e88e28d65b0168430e4747",
    measurementId: "G-8HXEDLS40G"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
const firestore = (0, firestore_1.getFirestore)(app);
exports.default = firestore;
//# sourceMappingURL=db.js.map