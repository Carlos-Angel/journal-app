/** * @jest-environment node */
import { deleteDoc, disableNetwork, doc, getDoc } from '@firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from 'app';
import {
  startNewNote,
  startLoadingNotes,
  startSaveNote,
  startUploading,
} from 'actions/notes';
import { notesTypes } from 'types';

jest.mock('helpers/fileUpload', () => ({
  fileUpload: jest.fn(() => {
    return Promise.resolve('https://test.com/imagen.jpg');
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'TESTING-UID',
  },
  notes: {
    active: {
      id: 'Kj6fh3vgDwetsNJuho9y',
      title: 'tes note',
      body: 'test description note',
    },
  },
};

let store = mockStore(initState);

describe('Pruebas con las acciones notes', () => {
  afterAll(() => {
    disableNetwork(db);
  });

  beforeEach(() => {
    store.clearActions();
  });

  test('debe de crear una nueva nota startNewNote', async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();
    // console.log(actions);

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

  test('startLoadingNotes debe cargar las notas', async () => {
    await store.dispatch(startLoadingNotes('TESTING-UID'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: notesTypes.load,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test('startSaveNote debe de actualizarla nota', async () => {
    const note = {
      id: '0Yv4JfPrfwzHGa9qUlyB',
      title: 'titulo editado',
      body: 'body editado',
    };

    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();

    expect(actions[0].type).toBe(notesTypes.update);
    const docRef = await getDoc(
      doc(db, `/TESTING-UID/journal/notes/${note.id}`),
    );

    expect(note.title).toBe(docRef.data().title);
  });

  test('debe de actualizar el url del entry - startUploading', async () => {
    const file = [];
    await store.dispatch(startUploading(file));

    const docRef = await getDoc(
      doc(db, '/TESTING-UID/journal/notes/Kj6fh3vgDwetsNJuho9y'),
    );

    expect(docRef.data().url).toBe('https://test.com/imagen.jpg');
  });
});
