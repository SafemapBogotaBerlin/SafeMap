import {  collection, addDoc, getDocs } from 'firebase/firestore';
import firestore  from './db'

export interface coordinates {
  latitude: number
  longitude: number
};

export async function addColdPointModel(testData: { user_id: string, added_dttm: string, danger_type: string, coordinates: coordinates }): Promise<string | undefined> {
  try {
    const docRef = await addDoc(collection(firestore, 'dangerPoints'), testData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    return undefined;
  }
}

export async function getColdPointsModel(): Promise<any[] | undefined> {
  try {
    const docRef = await getDocs(collection(firestore, 'dangerPoints'));
    const documents: any[] = [];
    docRef.forEach((doc) => {
      const data = doc.data();
      documents.push(data);
    })
    return documents;
  } catch (error) {
    console.error('Error adding document: ', error);
    return undefined;
  }
}