import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { googleAuthProvider } from 'app';
import { authTypes } from 'types';

export const startLoginWithEmailAndPassword = (email, password) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(123, 'pedro'));
    }, 3500);
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
      .catch((error) => console.error(error.message));
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => dispatch(login(user.uid, user.displayName)))
      .catch((error) => console.error(error.message));
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
