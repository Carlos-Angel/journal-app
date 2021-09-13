/** * @jest-environment node */
import configureStore from 'redux-mock-store';
import { db } from 'app';
import { disableNetwork } from '@firebase/firestore';
import thunk from 'redux-thunk';
import {
  login,
  logout,
  startLogout,
  startLoginWithEmailAndPassword,
} from 'actions/auth';
import { authTypes, notesTypes } from 'types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('pruebas con las acciones de auth', () => {
  // afterAll(() => {
  //   disableNetwork(db);
  // });

  beforeEach(() => {
    store.clearActions();
  });

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

  test('debe de realizar el startLogout', async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: authTypes.logout,
    });

    expect(actions[1]).toEqual({
      type: notesTypes.logoutCleaning,
    });
  });

  test('debe de iniciar el startLoginWithEmailAndPassword', async () => {
    await store.dispatch(
      startLoginWithEmailAndPassword('test@test.com', '123456'),
    );
    const actions = store.getActions();

    expect(actions[2]).toEqual({
      type: authTypes.login,
      payload: {
        uid: '9uPr5rVXbpNnviSuOMfPbYO02jF3',
        displayName: null,
      },
    });
  });
});
