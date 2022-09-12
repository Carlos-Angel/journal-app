import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'no-authenticated', // *status:checking, no-authenticated, authenticated
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    errorMessage: '',
  },
  reducers: {
    login: (state, action) => {},
    logout: (state, action) => {},
    checkingCredentials: (state, action) => {
      state.status = 'checking';
    },
  },
});
export const { login, logout, checkingCredentials } = authSlice.actions;
