import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../types/index';

interface LoginState {
  authenticated: boolean;
  userData: UserData;
}

const initialState: LoginState = {
  authenticated: false,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    authenticate: (state) => {
      state.authenticated = true;
    },

    updateUserName: (state, action) => {
      state.userData.name = action.payload;
    },

    logout: (state) => {
      state.authenticated = false;
      state.userData = null;
    },
  },
});

export const { setUserData, authenticate, updateUserName, logout } =
  authSlice.actions;
export default authSlice.reducer;
