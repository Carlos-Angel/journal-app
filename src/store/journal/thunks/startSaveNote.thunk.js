import { doc, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../../firebase/config';
import { setSaving, updateNote } from '../journal.slice';

const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(note));
  };
};

export default startSaveNote;
