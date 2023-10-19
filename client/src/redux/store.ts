import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './home/index';
import authReducer from './home/index';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
