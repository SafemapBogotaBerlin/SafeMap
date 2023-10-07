import { Request, Response } from 'express';
import { addTestToFirestore, getTestFromFirestore } from '../models/testModel';

export async function addTest(req: Request, res: Response): Promise<Response> {
  const { value } = req.body;

  if (!value) {
    return res.status(400).json({ error: 'Value is required' });
  }

  try {
    const id = await addTestToFirestore({ value });
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

export async function getTest(req: Request, res: Response): Promise<Response> {
  try {
    console.log('here')
    const documents = await getTestFromFirestore()
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
  