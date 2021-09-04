import Swal from 'sweetalert2';
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { googleAuthProvider } from 'app';
import { startLoading, finishLoading } from './ui';
import { authTypes } from 'types';

export const startLoginWithEmailAndPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => dispatch(login(user.uid, user.displayName)))
      .catch((message) => Swal.fire('Error', message, 'error'))
      .finally(dispatch(finishLoading()));
  };
};

export const startRegister = ({ email, password, name }) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((message) => Swal.fire('Error', message, 'error'));
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => dispatch(login(user.uid, user.displayName)))
      .catch((message) => Swal.fire('Error', message, 'error'));
  };
};

export const login = (uid, displayName) => {
  return {
    type: authTypes.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(logout());
  };
};

export const logout = () => {
  return {
    type: authTypes.logout,
  };
};
