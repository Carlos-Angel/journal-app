import { signInWithEmailAndPassword } from '../../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../../src/store/auth/auth.slice';
import startLoginWithEmailAndPassword from '../../../../src/store/auth/thunks/startLoginWithEmailAndPassword.thunk';
import { demoUser } from '../../../fixtures/auth-fixtures';

jest.mock('../../../../src/firebase/providers.js');

describe('pruebas en startLoginWithEmailAndPassword', () => {
  test('debe de iniciar la sesión con email y password', async () => {
    const dispatch = jest.fn();
    const loginData = { ok: true, ...demoUser };

    await signInWithEmailAndPassword.mockResolvedValue(loginData);

    await startLoginWithEmailAndPassword(loginData.email, 'password')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('debe de llamar checkingCredentials y logout - error', async () => {
    const dispatch = jest.fn();
    const loginData = { ok: false, errorMessage: 'error de google' };

    await signInWithEmailAndPassword.mockResolvedValue(loginData);

    await startLoginWithEmailAndPassword(loginData.email, 'no-password')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }));
  });
});
