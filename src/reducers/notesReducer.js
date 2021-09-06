import { notesTypes } from 'types';

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case notesTypes.add:
      return { ...state };

    default:
      return state;
  }
};
