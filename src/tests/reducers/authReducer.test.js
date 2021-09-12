import { authReducer } from 'reducers/authReducer';
import { authTypes } from 'types';

describe('Pruebas en authReducer', () => {
  test('login', () => {
    const action = {
      type: authTypes.login,
      payload: {
        uid: 'yyy-yyy-yyy',
        displayName: 'test',
      },
    };

    const expected = {
      uid: 'yyy-yyy-yyy',
      name: 'test',
    };

    const state = authReducer({}, action);

    expect(state).toEqual(expected);
  });

  test('logout', () => {
    const action = {
      type: authTypes.logout,
    };

    const initState = {
      uid: 'yyy-yyy-yyy',
      name: 'test',
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({});
  });

  test('default', () => {
    const action = {
      type: 'default',
    };

    const initState = {
      uid: 'yyy-yyy-yyy',
      name: 'test',
    };

    const state = authReducer(initState, action);

    expect(state).toEqual(initState);
  });
});
