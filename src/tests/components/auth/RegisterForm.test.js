import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { RegisterScreen } from 'components/auth/RegisterScreen';
import { Provider } from 'react-redux';
import { authTypes } from 'types';

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

describe('Pruebas del componente <RegisterScreen />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    </Provider>,
  );

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de hacer el dispatch de ña acción respectiva', () => {
    const emailField = wrapper.find('input[name="email"]');
    emailField.simulate('change', {
      target: {
        value: '',
        name: 'name',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: authTypes.uiSetError,
      payload: 'name is required',
    });
  });

  test('debe de mostrar el div de alert error', () => {
    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'name is required',
      },
    };

    let store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(
      'name is required',
    );
  });
});
