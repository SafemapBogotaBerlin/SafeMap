import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Coordinates, DataObject } from '../../types';
import * as Location from 'expo-location';

interface HomeState {
  data: DataObject;
  selectedPoint: Coordinates | null;
  isFormOpen: boolean;
  isPointClicked: boolean;
  whatShouldBeOpened: string;
  location: Location.LocationObject | null;
  userLocation: Coordinates | null;
  isInfoOpened: boolean;
}

const data: DataObject = {};

const initialState: HomeState = {
  data: data,
  selectedPoint: null,
  isFormOpen: false,
  isPointClicked: false,
  whatShouldBeOpened: '',
  location: null,
  userLocation: null,
  isInfoOpened: true,
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
    updateUserLocation: (state, action: PayloadAction<Coordinates | null>) => {
      state.userLocation = action.payload;
    },
    setIsInfoOpened: (state, action: PayloadAction<boolean>) => {
      state.isInfoOpened = action.payload;
    },
  },
});

export const {
  selectPoint,
  toggleForm,
  whatShouldBeOpenedChange,
  updateUserLocation,
  setIsInfoOpened,
} = homeSlice.actions;
export default homeSlice.reducer;
