import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Coordinates, Point, DataObject } from '../../../types/point';

interface HomeState {
  data: DataObject;
  selectedPoint: Coordinates | null;
  status: 'idle' | 'pending' | 'succeeded' | 'rejected';
  error: string | null;
}

let data: DataObject = {};

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
