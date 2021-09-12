import { deleteDoc, disableNetwork, doc } from '@firebase/firestore';
import { startNewNote } from 'actions/notes';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from 'app';
import { notesTypes } from 'types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
  auth: {
    uid: 'TESTING-UID',
  },
});

describe('Pruebas con las acciones notes', () => {
  afterAll(async () => {
    await disableNetwork(db);
  });

  test('debe de crear una nueva nota - startNewNote', async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: notesTypes.active,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: notesTypes.add,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    const docId = actions[0].payload.id;

    const referenceDocument = doc(db, `TESTING-UID/journal/notes/${docId}`);
    await deleteDoc(referenceDocument);
  });
});
