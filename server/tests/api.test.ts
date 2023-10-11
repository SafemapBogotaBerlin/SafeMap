import { app } from "../models/db";
import {
  getFirestore,
  addDoc,
  getDoc,
  collection,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

interface coordinates {
  latitude: number;
  longitude: number;
}

interface point {
  user_id: string;
  added_dttm: string;
  danger_type: string;
  coordinates: coordinates;
}

const firestore: any = getFirestore(app);

describe(" Integration Tests", () => {
  afterAll(async () => {
    const docRef = await getDocs(collection(firestore, "testPoints"));
    docRef.forEach(async (operDoc) => {
      await deleteDoc(doc(firestore, "testPoints", operDoc.id));
    });
  });
  it("should create a new point in the database", async () => {
    const testData: point = {
      user_id: "test user",
      added_dttm: "01 01 0001 00:02",
      danger_type: "test danger",
      coordinates: {
        latitude: 52.46837317833486,
        longitude: 13.43183324269434,
      },
    };

    const docRef = await addDoc(collection(firestore, "testPoints"), testData);
    const docPre = doc(firestore, "testPoints", docRef.id);
    const docSnap = await getDoc(docPre);
    expect(docSnap.data().danger_type).toBe(testData.danger_type);
  });
});
