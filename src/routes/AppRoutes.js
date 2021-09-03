import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { JournalScreen } from 'components/journal/JournalScreen';
import { AuthRoutes } from './AuthRoutes';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={JournalScreen} />
          <Route path='/auth' component={AuthRoutes} />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
