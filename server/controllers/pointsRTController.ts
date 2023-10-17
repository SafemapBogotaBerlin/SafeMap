import { Request, Response } from 'express';
import { addRealTimePointModel } from '../models/pointsRealTime';


export async function addPointRT(req: Request, res: Response): Promise<Response> {
  const { user_id, added_dttm, danger_type, coordinates } = req.body;
  const { latitude, longitude } = coordinates;
  if (!user_id || !added_dttm || !danger_type || !coordinates) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    await addRealTimePointModel({ user_id, added_dttm, danger_type, coordinates }, 'hotpoints');
    return res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error adding test data: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}