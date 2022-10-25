import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { firebaseDB } from '../../../../src/firebase/config';
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from '../../../../src/store/journal/journal.slice';
import startNewNote from '../../../../src/store/journal/thunks/startNewNote.thunk';

describe('pruebas en startNewNote', () => {
  test('debe de crear una nueva nota en blanco', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    const uid = 'TESTING-UID';

    getState.mockReturnValue({ auth: { uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      }),
    );

    // Borrar de firebase
    const collectionRef = collection(firebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
    await Promise.all(deletePromises);
  });
});
