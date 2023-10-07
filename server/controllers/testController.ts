import { Request, Response } from 'express';
import { addColdPointModel, getColdPointsModel, coordinates } from '../models/testModel';

export async function addPoint(req: Request, res: Response): Promise<Response> {
  const { user_id, added_dttm, danger_type, coordinates } = req.body;
  const { latitude, longitude } = coordinates;

  if (!user_id || !added_dttm || !danger_type || !coordinates) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const id = await addColdPointModel({ user_id, added_dttm, danger_type, coordinates });
    if (id) {
      res.status(201).json({ id });
    } else {
      res.status(500).json({ error: 'Failed to add test data' });
    }
  } catch (error) {
    console.error('Error adding test data: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getColdPoints(req: Request, res: Response): Promise<Response> {
  try {
    console.log('here')
    const documents = await getColdPointsModel()
    if (documents) {
      res.status(200).json(documents);
    } else {
      res.status(500).json({ error: 'Failed to fetch test data' });
    }
  } catch (error) {
    console.error('Error fetching test data: ', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
  