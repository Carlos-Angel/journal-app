import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRoutes } from './AuthRoutes';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className='auth__main'>
        <div className='auth__box-container'>
          <Switch>
            <Route exact path='/' component={JournalScreen} />
            <Route path='/auth' component={AuthRoutes} />
            <Redirect to='/auth/login' />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};
