import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './Home';
import authReducer from './Session';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
  },
  middleware: [thunk, logger],
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
