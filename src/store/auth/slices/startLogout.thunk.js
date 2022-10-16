import { logoutFirebase } from '../../../firebase/providers';
import { logout, showError } from './auth.slice';

const startLogout = () => {
  return async (dispatch) => {
    const result = await logoutFirebase();
    if (!result.ok) return dispatch(showError(result.errorMessage));
    dispatch(logout({ errorMessage: '' }));
  };
};

export default startLogout;
