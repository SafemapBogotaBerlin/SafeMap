import { Firestore, collection, addDoc,getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore/lite';
import firestore  from './db'

//const fs = getFirestore(); 

export async function addTestToFirestore(testData: { value: string }): Promise<string | undefined> {
  try {
    const docRef = await addDoc(collection(firestore, 'test'), testData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    return undefined;
  }
}

export async function getTestFromFirestore(): Promise<any[] | undefined> {
  try {
    const docRef = await getDocs(collection(firestore, 'test'));
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