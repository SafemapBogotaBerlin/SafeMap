import { createAsyncThunk } from '@reduxjs/toolkit';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Point {
  added_dttm: string;
  coordinates: Coordinates;
  danger_type: string;
  user_id: string;
}

export const addPointToDatabase = createAsyncThunk<Point, Point>(
  'home/addPointToDatabase',
  async (point, { rejectWithValue }) => {
    const apiEndpoint = 'localhost:8001/addDangerPointRT';

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(point),
      });

      if (response.ok) {
        return point;
      } else {
        return rejectWithValue('Failed to add point to the database.');
      }
    } catch (error) {
      return rejectWithValue('Error occurred while adding point.');
    }
  }
);
