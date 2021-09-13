import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { LoginScreen } from 'components/auth/LoginScreen';
import { Provider } from 'react-redux';
import { startGoogleLogin, startLoginWithEmailAndPassword } from 'actions/auth';

jest.mock('actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginWithEmailAndPassword: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: '',
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas del componente <LoginScreen />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    </Provider>,
  );

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de disparar la acción startGoogleLogin', () => {
    const buttonGoogle = wrapper.find('.google-btn').prop('onClick');
    buttonGoogle();

    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test('debe de disparar el startLoginWithEmailAndPassword', () => {
    const buttonForm = wrapper.find('form').prop('onSubmit');
    buttonForm({ preventDefault() {} });

    expect(startLoginWithEmailAndPassword).toBeCalledTimes(0);
  });
});
