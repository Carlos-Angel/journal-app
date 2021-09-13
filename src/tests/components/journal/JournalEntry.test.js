import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { activeNote } from 'actions/notes';
import { JournalEntry } from 'components/journal/JournalEntry';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('pruebas en <JournalEntry />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  const note = {
    id: '1',
    date: 0,
    title: 'title note',
    body: 'body note',
    url: 'https://imagen.com/test.jpg',
  };

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <JournalEntry {...note} />
      </MemoryRouter>
    </Provider>,
  );

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de activar la nota', () => {
    wrapper.find('.journal__entry').prop('onClick')();

    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(note.id, { ...note }),
    );
  });
});
