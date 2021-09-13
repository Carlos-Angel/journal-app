import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { startLogout } from 'actions/auth';
import { startNewNote } from 'actions/notes';
import { Sidebar } from 'components/journal/Sidebar';

jest.mock('actions/auth', () => ({
  startLogout: jest.fn(),
}));

jest.mock('actions/notes', () => ({
  startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'TESTING-UID',
    name: 'test',
  },
  ui: {
    loading: false,
    msgError: '',
  },
  notes: {
    active: null,
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <Sidebar />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Provider>,
  );

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de llamar el logout', () => {
    const buttonLogout = wrapper.find('.btn').prop('onClick');
    buttonLogout();

    expect(startLogout).toHaveBeenCalled();
  });

  test('debe de llamar el startNewNote', () => {
    const buttonNewEntry = wrapper.find('.journal__new-entry').prop('onClick');
    buttonNewEntry();

    expect(startNewNote).toHaveBeenCalled();
  });
});
