import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { activeNote } from 'actions/notes';
import { NoteScreen } from 'components/notes/NoteScreen';

jest.mock('actions/notes', () => ({
  activeNote: jest.fn(),
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
    active: {
      id: '1',
      title: '',
      body: '',
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <NoteScreen />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <NoteScreen />
      </MemoryRouter>
    </Provider>,
  );

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de disparar el active note', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'titulo de la nota',
      },
    });

    expect(activeNote).toHaveBeenCalledWith('1', {
      id: '1',
      body: '',
      title: 'titulo de la nota',
    });
  });
});
