import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './home';
import authReducer from './session';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
