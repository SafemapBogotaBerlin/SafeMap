import { createSlice } from '@reduxjs/toolkit';

interface LoginState {
  value: boolean;
  // with the proper Authentification, different and more variables
}

const initialState: LoginState = {
  value: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.value = !state.value;
    },
    loginFalse: (state) => {
      state.value = false;
    },
  },
});

export const { login, loginFalse } = authSlice.actions;
export default authSlice.reducer;
