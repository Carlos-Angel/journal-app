import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';
import { useForm } from 'hooks/useForm';
import { activeNote } from 'actions/notes';

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const [{ body, title }, handleInputChange, reset] = useForm(note);
  const activeId = useRef(note.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(note.id, { ...note, title, body }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body, title]);

  return (
    <div className='notes__main-content'>
      <NotesAppBar />

      <div className='notes__content'>
        <input
          type='text'
          placeholder='Some awesome title'
          name='title'
          className='notes__title-input'
          autoComplete='off'
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          name='body'
          className='notes__textarea'
          placeholder='what happened today'
          value={body}
          onChange={handleInputChange}
        ></textarea>

        <div className='notes__image'>
          {note?.url && <img src={note.url} alt='title-note' />}
        </div>
      </div>
    </div>
  );
};
