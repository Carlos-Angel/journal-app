import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';
import { useForm } from 'hooks/useForm';

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const [{ body, title }, handleInputChange, reset] = useForm(note);
  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

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
          name='description'
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
