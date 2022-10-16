import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'no-authenticated', // *status:checking, no-authenticated, authenticated
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
  errorMessage: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = 'authenticated';
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.errorMessage = '';
    },
    logout: (state, action) => ({
      ...initialState,
      status: 'no-authenticated',
      errorMessage: action.payload.errorMessage,
    }),
    checkingCredentials: (state, action) => {
      state.status = 'checking';
    },
    emptyError: (state, action) => {
      state.errorMessage = '';
    },
    showError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});
export const { login, logout, checkingCredentials, emptyError, showError } = authSlice.actions;
