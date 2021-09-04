import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { JournalScreen } from 'components/journal/JournalScreen';
import { AuthRoutes } from './AuthRoutes';
import { login } from 'actions/auth';

export const AppRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
      }
    });
  }, [dispatch]);

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
