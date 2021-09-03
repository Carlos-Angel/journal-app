import React from 'react';
import { Provider } from 'react-redux';
import { store } from './components/store';
import { AppRoutes } from './routes/AppRoutes';

export const JournalApp = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
};
