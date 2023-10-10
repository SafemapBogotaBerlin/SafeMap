import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

dotenv.config({path:'../.env'});

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_APIKEY, 
  authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_APPID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENTID 
};

const app = initializeApp(firebaseConfig);
const firestore : any = getFirestore(app);

export default firestore;
export {app};