import { loadNotes } from '../../../firebase/journal/loadNotes';
import { setNotes } from '../journal.slice';

const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error('El UID del usuario no existe');

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export default startLoadingNotes;
