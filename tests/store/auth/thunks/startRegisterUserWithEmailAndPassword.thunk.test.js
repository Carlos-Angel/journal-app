import { registerUserWithEmailAndPassword } from '../../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../../src/store/auth/auth.slice';
import startRegisterUserWithEmailAndPassword from '../../../../src/store/auth/thunks/startRegisterUserWithEmailAndPassword.thunk';
import { demoUser } from '../../../fixtures/auth-fixtures';

jest.mock('../../../../src/firebase/providers.js');

describe('pruebas en startRegisterUserWithEmailAndPassword', () => {
  test('debe de iniciar la sesión al registrar un email, password y displayName', async () => {
    const dispatch = jest.fn();
    const registerData = { ...demoUser, ok: true };

    await registerUserWithEmailAndPassword.mockResolvedValue(registerData);

    await startRegisterUserWithEmailAndPassword({
      email: registerData.email,
      password: 'password',
      displayName: registerData.displayName,
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(registerData));
  });

  test('debe de llamar checkingCredentials y logout - error', async () => {
    const dispatch = jest.fn();
    const registerData = { ok: false, errorMessage: 'error de google' };

    await registerUserWithEmailAndPassword.mockResolvedValue(registerData);

    await startRegisterUserWithEmailAndPassword({
      email: registerData.email,
      password: 'password',
      displayName: registerData.displayName,
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: registerData.errorMessage }));
  });
});
