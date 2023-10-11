import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Point } from '../../types';



interface HomeState {
  hotpoints: Point[];
  selectedPoint: Point | null;
}

const initialState: HomeState = {
  // this should be replaced by the call to the real time database
  hotpoints: [
    { latitude: 19.532608, longitude: -99.53209 },
    { latitude: 19.632608, longitude: -99.73209 },
    { latitude: 19.732608, longitude: -99.03 },
    {latitude: 4.820954117734985, longitude: -74.06501975735756}
  ],
  selectedPoint: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    addPoint: (state, action: PayloadAction<Point>) => {
      state.hotpoints = [...state.hotpoints, action.payload];
    },
    selectPoint: (state, action: PayloadAction<Point>) => {
      state.selectedPoint = { ...action.payload };
    },
    // next Action would be real time DB update
  },
});

export const { addPoint, selectPoint } = homeSlice.actions;
export default homeSlice.reducer;
