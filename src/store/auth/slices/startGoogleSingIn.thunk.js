import { sigInWithGoogle } from '../../../firebase/providers';
import { checkingCredentials, logout, login } from './auth.slice';

const startGoogleSingIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await sigInWithGoogle();

    if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }));

    dispatch(login(result));
  };
};

export default startGoogleSingIn;
