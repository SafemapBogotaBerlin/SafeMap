import {  collection, addDoc, getDocs } from 'firebase/firestore';
import firestore  from './db'
import { getDatabase, ref, set } from "firebase/database";

const database = getDatabase();

export interface coordinates {
  latitude: number
  longitude: number
};

export interface point {
  user_id: string
  added_dttm: string
  danger_type: string
  coordinates: coordinates
};

const dangerPointsCollection = 'dangerPoints';

export async function addColdPointModel(data: point): Promise<string | undefined> {
  try {
    const docRef = await addDoc(collection(firestore, dangerPointsCollection), data);
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