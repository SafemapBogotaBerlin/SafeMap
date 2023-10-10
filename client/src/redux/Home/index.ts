import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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

interface DataObject {
  [key: string]: Point;
}

interface HomeState {
  data: DataObject;
  selectedPoint: Coordinates | null;
  status: 'idle' | 'pending' | 'succeeded' | 'rejected';
  error: string | null;
}

let data: DataObject = {};

//const dispatch = useDispatch();

export const addPointToDatabase = async () => {
  console.log('Async function started');
  const apiEndpoint: string = 'http://localhost:8001/addDangerPointRT';

  try {
    // await fetch(apiEndpoint, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     added_dttm: 'tomorrowmorning',
    //     coordinates: { latitude: 24.432608, longitude: -100.133209 },
    //     danger_type: 'big danger',
    //     user_id: 'some user',
    //   }),
    // });

    await axios.post(apiEndpoint, {
      "added_dttm": 'tomorrowmorning',
      "coordinates": { "latitude": 24.432608, "longitude": -100.133209 },
      "danger_type": 'big danger',
      "user_id": 'some user',
    });

    console.log('what!!!');
    // if (response.ok) {
    //   console.log('Async function succeeded');
    // } else {
    //   console.log('Async function failed');
    //   //return rejectWithValue('Failed to add point to the database.');
    // }
  } catch (error) {
    console.error('Async function error:', error);
    //return rejectWithValue('Error occurred while adding point.');
  }
};

const initialState: HomeState = {
  data: data,
  selectedPoint: null,
  status: 'idle',
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    updatePoints: (state) => {
      state.data = data;
    },
    // addPoint: (state, action: PayloadAction<Point>) => {},
    selectPoint: (state, action: PayloadAction<Coordinates>) => {
      state.selectedPoint = { ...action.payload };
    },
    // next Action would be real time DB update
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(addPointToDatabase.pending, (state) => {
  //       console.log('check1');
  //       state.status = 'pending';
  //       console.log('check3');
  //     })
  //     .addCase(addPointToDatabase.fulfilled, (state, action) => {
  //       console.log('check2');

  //       // state.data = action.payload;
  //       console.log(action.payload);
  //       //state.hotpoints.push(action.payload);
  //     })
  //     .addCase(addPointToDatabase.rejected, (state, action) => {
  //       console.log('check4');

  //       state.status = 'rejected';
  //       state.error = action.error.message;
  //     });
  // },
});

// export const { addPoint, selectPoint } = homeSlice.actions;
export const { selectPoint } = homeSlice.actions;
export default homeSlice.reducer;
