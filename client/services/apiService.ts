import { Point } from '../types/point';

const NGROK_URL = 'https://d365-213-86-144-42.ngrok-free.app';

export async function addDangerPointToBothDBs(hotpoint: Point) {
  await addDangerPointRT(hotpoint);
  await addDangerPoint(hotpoint);
}

async function addDangerPointRT(hotpoint: Point) {
  try {
    await fetch(`${NGROK_URL}/addDangerPointRT`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hotpoint),
    });
  } catch (e) {
    console.error(e, 'Error when adding to RT DB');
  }
}

async function addDangerPoint(hotpoint: Point) {
  try {
    await fetch(`${NGROK_URL}/addDangerPoint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hotpoint),
    });
  } catch (e) {
    console.error(e, 'Error when adding to Normal DB');
  }
}
