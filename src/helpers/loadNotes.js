import { db } from 'app';
import { collection, query, getDocs } from 'firebase/firestore';

export const loadNotes = async (uid) => {
  const q = query(collection(db, `${uid}/journal/notes`));
  const notes = [];

  const notesSnapshot = await getDocs(q);
  notesSnapshot.forEach((note) => {
    notes.push({ id: note.id, ...note.data() });
  });
  return notes;
};
