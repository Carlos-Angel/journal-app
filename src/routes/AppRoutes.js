import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { JournalScreen } from 'components/journal/JournalScreen';
import { PrivateRoute } from './PrivateRoutes';
import { PublicRoute } from './PublicRoutes';

import { AuthRoutes } from './AuthRoutes';
import { login } from 'actions/auth';

export const AppRoutes = () => {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return null;
  }

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <PublicRoute
            isLogged={isLoggedIn}
            path='/auth'
            component={AuthRoutes}
          />
          <PrivateRoute
            isLogged={isLoggedIn}
            exact
            path='/'
            component={JournalScreen}
          />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
