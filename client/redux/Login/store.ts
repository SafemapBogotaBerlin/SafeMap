import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '.';
export const store = configureStore({
  reducer: {
    test: loginReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
