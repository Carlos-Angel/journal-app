import { signInWithEmailAndPassword } from '../../../firebase/providers';
import { checkingCredentials, login, logout } from './auth.slice';

const startLoginWithEmailAndPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithEmailAndPassword(email, password);
    if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }));

    dispatch(login(result));
  };
};

export default startLoginWithEmailAndPassword;
