import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Coordinates, Point, DataObject } from '../../../types/point';


interface HomeState {
  hotpoints: Coordinates[];
  data: DataObject;
  selectedPoint: Coordinates | null;
  status: 'idle' | 'pending' | 'succeeded' | 'rejected';
  error: string | null;
}
 

let data: DataObject = {};


const initialState: HomeState = {

  // this should be replaced by the call to the real time database
  hotpoints: [
    { latitude: 19.532608, longitude: -99.53209 },
    { latitude: 19.632608, longitude: -99.73209 },
    { latitude: 19.732608, longitude: -99.03 },
    {latitude: 4.820954117734985, longitude: -74.06501975735756}
  ],

  data: data,

  selectedPoint: null,
  status: 'idle',
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    // updatePoints: (state) => {
    //   update a point might be needed later
    // },
    selectPoint: (state, action: PayloadAction<Coordinates>) => {
      state.selectedPoint = { ...action.payload };
    },
  },
});

export const { selectPoint } = homeSlice.actions;
export default homeSlice.reducer;
