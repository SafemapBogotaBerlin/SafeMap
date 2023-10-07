import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAM2TYDpwTfII_E1vCpVcFgRH5kNcAokDE",
  authDomain: "safemap-330e2.firebaseapp.com",
  projectId: "safemap-330e2",
  storageBucket: "safemap-330e2.appspot.com",
  messagingSenderId: "1073813292870",
  appId: "1:1073813292870:web:e88e28d65b0168430e4747",
  measurementId: "G-8HXEDLS40G"
};

const app = initializeApp(firebaseConfig);
const firestore : any = getFirestore(app);

export default firestore;
export {app};