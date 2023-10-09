
//import { PrismaClient } from "@prisma/client";
//import { describe }  from 'jest';

import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, getDoc, collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import {jest} from '@jest/globals';


interface coordinates {
  latitude: number
  longitude: number
};

interface point {
  user_id: string
  added_dttm: string
  danger_type: string
  coordinates: coordinates
};

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


describe(' Integration Tests', () => {

  afterAll(async () => {
    const docRef = await getDocs(collection(firestore, 'testPoints'));
    docRef.forEach(async (operDoc) => {
      console.log(operDoc.id)
      await deleteDoc(doc(firestore, "testPoints", operDoc.id))
    })
    ///app.delete()  - let it be this way
  })
  it('should create a new point in the database', async () => {

    const testData : point = 
    {"user_id": "test user",
    "added_dttm": "01 01 0001 00:02",
    "danger_type": "test danger",
    "coordinates": {
        "latitude": 52.46837317833486, 
        "longitude": 13.43183324269434
        }
    }
    
    const docRef = await addDoc(collection(firestore, 'testPoints'), testData)
    const docPre = doc(firestore, 'testPoints',docRef.id)
    const docSnap = await getDoc(docPre);
    expect(docSnap.data().danger_type).toBe(testData.danger_type);
  });

});
