import { checkingCredentials } from './auth.slice';

const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export default checkingAuthentication;
