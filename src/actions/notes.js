import { db } from 'app';
import { notesTypes } from 'types';
import { addDoc, collection } from 'firebase/firestore';
import { loadNotes } from 'helpers/loadNotes';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const note = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const document = await addDoc(collection(db, `${uid}/journal/notes`), note);
    dispatch(activeNote(document.id, note));
  };
};

export const activeNote = (id, note) => ({
  type: notesTypes.active,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: notesTypes.load,
  payload: notes,
});
