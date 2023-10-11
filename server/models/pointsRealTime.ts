import { getDatabase, set, ref, push, remove } from 'firebase/database';
import { app } from './db';
import { point } from './pointsCold';

const database = getDatabase(app);

export async function addRealTimePointModel(data: point, collection: string): Promise<void> {
  console.log('realtime here');
  const dbRef = ref(database, collection);
  const newPOint = push(dbRef);
  set(newPOint, data)
}

export async function deleteRealTimeCollection(collection: string) : Promise<void> {
  const dbRef = ref(database, collection)
  remove(dbRef)
}

