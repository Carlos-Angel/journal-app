import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/auth.slice';
import { authenticatedState, demoUser, initialState } from '../../fixtures/auth-fixtures';

describe('pruebas en authSlice', () => {
  test('debe de retornar el estado inicial y llamarse "auth"', () => {
    expect(authSlice.name).toBe('auth');

    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test('debe de realizar la autenticación', () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: '',
    });
  });

  test('debe de realizar el logout sin mensaje de error', () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual(initialState);
  });

  test('debe de realizar el logout con mensaje de error', () => {
    const errorMessage = 'invalid credentials';
    const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));

    expect(state).toEqual({
      status: initialState.status,
      uid: initialState.uid,
      email: initialState.email,
      displayName: initialState.displayName,
      photoURL: initialState.photoURL,
      errorMessage,
    });
  });

  test('debe de cambiar el estado a checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    expect(state.status).toBe('checking');
  });
});
