import { sigInWithGoogle } from '../../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../../src/store/auth/auth.slice';
import startGoogleSingIn from '../../../../src/store/auth/thunks/startGoogleSingIn.thunk';
import { demoUser } from '../../../fixtures/auth-fixtures';

jest.mock('../../../../src/firebase/providers.js');

describe('pruebas en startGoogleSignIn', () => {
  test('debe de llamar checkingCredentials y login exitoso', async () => {
    const dispatch = jest.fn();
    const loginData = { ok: true, ...demoUser };

    await sigInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSingIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('debe de llamar checkingCredentials y logout - error', async () => {
    const dispatch = jest.fn();
    const loginData = { ok: false, errorMessage: 'error de google' };

    await sigInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSingIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }));
  });
});
