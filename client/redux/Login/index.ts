import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'loggedin',
  initialState: {
    value: false,
  },
  reducers: {
    login: (state) => {
      state.value = !state.value;
    },
  },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
