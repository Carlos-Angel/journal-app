import { registerUserWithEmailAndPassword } from '../../../firebase/providers';
import { checkingCredentials, login, logout } from './auth.slice';

const startRegisterUserWithEmailAndPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmailAndPassword({ email, password, displayName });

    if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }));

    dispatch(login(result));
  };
};

export default startRegisterUserWithEmailAndPassword;
