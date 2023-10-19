import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Coordinates, DataObject } from '../../types';

interface HomeState {
  data: DataObject;
  selectedPoint: Coordinates | null;
  isFormOpen: boolean;
  isPointClicked: boolean;
  whatShouldBeOpened: string;
}

const data: DataObject = {};

const initialState: HomeState = {
  data: data,
  selectedPoint: null,
  isFormOpen: false,
  isPointClicked: false,
  whatShouldBeOpened: '',
};

const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    selectPoint: (state, action: PayloadAction<Coordinates>) => {
      state.selectedPoint = { ...action.payload };
    },
    toggleForm: (state, action: PayloadAction<boolean>) => {
      state.isFormOpen = action.payload;
    },

    whatShouldBeOpenedChange: (state, action: PayloadAction<string>) => {
      state.whatShouldBeOpened = action.payload;
    },
  },
});

export const { selectPoint, toggleForm, whatShouldBeOpenedChange } =
  homeSlice.actions;
export default homeSlice.reducer;
