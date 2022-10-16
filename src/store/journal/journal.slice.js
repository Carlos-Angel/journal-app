import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    noteCurrent: {
      // id: '',
      // title: '',
      // body: '',
      // date: 12345,
      // imageUrls: [],
    },
  },
  reducers: {
    addNewEmptyNote: (state, action) => {},
    setActiveNote: (state, action) => {},
    setNotes: (state, action) => {},
    setSaving: (state) => {
      state.isSaving = true;
    },
    updateNoteByID: (state, action) => {},
    deleteNoteByID: (state, action) => {},
  },
});
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNoteByID,
  deleteNoteByID,
} = journalSlice.actions;
