import { authTypes } from '../types';

export const startLoginWithEmailAndPassword = (email, password) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(123, 'pedro'));
    }, 3500);
  };
};

export const login = (uuid, displayName) => {
  return {
    type: authTypes.login,
    payload: {
      uuid,
      displayName,
    },
  };
};
