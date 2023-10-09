import { createSlice } from '@reduxjs/toolkit';

interface LoginState {
  value: boolean;
  authentificated: boolean;
  // with the proper Authentification, different and more variables
}

const initialState: LoginState = {
  value: false,
  authentificated: false,
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
    authentificate: (state) => {
      state.authentificated = true;
    },
  },
});

export const { login, loginFalse, authentificate } = authSlice.actions;
export default authSlice.reducer;
