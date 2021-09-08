import Swal from 'sweetalert2';
import { db } from 'app';
import { notesTypes } from 'types';
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { loadNotes } from 'helpers/loadNotes';
import { fileUpload } from 'helpers/fileUpload';

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
    dispatch(addNote(document.id, note));
  };
};

export const activeNote = (id, note) => ({
  type: notesTypes.active,
  payload: {
    id,
    ...note,
  },
});

export const addNote = (id, note) => ({
  type: notesTypes.add,
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

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote));

    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const referenceDocument = doc(db, `${uid}/journal/notes/${id}`);
    await deleteDoc(referenceDocument);
    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id) => ({
  type: notesTypes.delete,
  payload: id,
});

export const deleteNotes = () => ({
  type: notesTypes.logoutCleaning,
});
