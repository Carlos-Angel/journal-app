import Swal from 'sweetalert2';
import { db } from 'app';
import { notesTypes } from 'types';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
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

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    try {
      const referenceDocument = doc(db, uid, 'journal', 'notes', note.id);
      await updateDoc(referenceDocument, noteToFirestore);
      dispatch(refreshNote(note.id, noteToFirestore));
      Swal.fire('Saved', note.title, 'success');
    } catch (error) {
      Swal.fire('Error', 'error al guardar la nota', 'error');
    }
  };
};

export const refreshNote = (id, note) => ({
  type: notesTypes.update,
  payload: {
    id,
    ...note,
  },
});
