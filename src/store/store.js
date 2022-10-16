import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/slices';
import { journalSlice } from './journal';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
});

export default store;
