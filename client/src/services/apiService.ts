import { Point } from '../types';

const NGROK_URL = 'https://polliwog-topical-snapper.ngrok-free.app'
//https://ede2-213-86-144-42.ngrok-free.app'; //TODO add to .env

export async function addDangerPointToBothDBs(hotpoint: Point) {

  //add to Realtime DB only if the addded_dttm younger than 7 hours and 59 minutes and 30 seconds

  if ((Date.now()-JSON.parse(hotpoint.added_dttm))<(8*60*60*1000 - 30*1000)) {
    await addDangerPointRT(hotpoint);
  }
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

export async function getTotalPointsCold(): Promise<number> {
  try {
    const response= await fetch(`${NGROK_URL}/getDangerPoints`);
    //console.log(response)
    if (response.ok) {
      const data = await response.json();
      //console.log('from api '+data.length)
      return data.length;
    } else {
      console.log('error fetching')
    }
    ;
  } catch (e) {
    console.error(e, 'Error getting points history')
  }
}
  
