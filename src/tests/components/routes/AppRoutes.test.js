import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRoutes } from 'routes/AppRoutes';
import { Provider } from 'react-redux';
import { login } from 'actions/auth';
import { app } from 'app';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';

jest.mock('actions/auth', () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: '',
  },
  notes: {
    active: {
      id: 'ABC',
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('debe de llamar al login si estoy autenticado', async () => {
    await act(async () => {
      const auth = getAuth(app);
      const userCred = await signInWithEmailAndPassword(
        auth,
        'test@test.com',
        '123456',
      );

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRoutes />
          </MemoryRouter>
        </Provider>,
      );
    });
    expect(login).toHaveBeenCalledWith('9uPr5rVXbpNnviSuOMfPbYO02jF3', null);
  });
});
