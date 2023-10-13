import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../types/index';

interface LoginState {
  authenticated: boolean;
  userData: UserData
  // with the proper Authentification, different and more variables
}

const initialState: LoginState = {
  authenticated: false, //should be false (for going to home added true)
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

    updateUserEmail: (state, action) => {
      state.userData.email = action.payload;
    },
    //TO DO - Home region
    /* updateHomeRegion: (state, action) => {
      state.userData.homeRegion = action.payload;
    } */
  },
});

export const { setUserData, authenticate, updateUserName, updateUserEmail } = authSlice.actions;
export default authSlice.reducer;
