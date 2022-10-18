import { doc, deleteDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../../firebase/config';
import { deleteNoteById } from '../journal.slice';

const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { note } = getState().journal;

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};

export default startDeletingNote;
