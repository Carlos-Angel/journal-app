import { login, logout } from 'actions/auth';
import { authTypes } from 'types';

describe('pruebas con las acciones de auth', () => {
  test('login', () => {
    const uid = 'test-uid';
    const displayName = 'test';

    const action = login(uid, displayName);

    const expected = {
      type: authTypes.login,
      payload: {
        uid,
        displayName,
      },
    };

    expect(action).toEqual(expected);
  });

  test('logout', () => {
    const action = logout();

    const expected = {
      type: authTypes.logout,
    };

    expect(action).toEqual(expected);
  });
});
