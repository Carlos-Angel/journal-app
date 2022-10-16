import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    note: null,
    // note: {
    //   id: '',
    //   title: '',
    //   body: '',
    //   date: 12345,
    //   imageUrls: [],
    // },
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.note = action.payload;
      state.messageSaved = '';
    },
    setNotes: (state, action) => {},
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updateNoteByID: (state, action) => {},
    deleteNoteByID: (state, action) => {},
  },
});
export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNoteByID,
  deleteNoteByID,
} = journalSlice.actions;
