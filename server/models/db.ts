import { initializeApp } from 'firebase-admin/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const app = initializeApp();

// need db url and other info about db
