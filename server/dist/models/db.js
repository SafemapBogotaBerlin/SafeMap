"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
dotenv_1.default.config({ path: '../.env' });
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_APIKEY,
    authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECTID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.EXPO_PUBLIC_APPID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENTID
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
const firestore = (0, firestore_1.getFirestore)(app);
exports.default = firestore;
//# sourceMappingURL=db.js.map