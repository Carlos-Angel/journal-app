import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  return (
    <div className='notes__main-content'>
      <NotesAppBar />

      <div className='notes__content'>
        <input
          type='text'
          placeholder='Some awesome title'
          name='title'
          className='notes__title-input'
          autocomplete='off'
        />
        <textarea
          name='description'
          className='notes__textarea'
          placeholder='what happened today'
        ></textarea>

        <div className='notes__image'>
          <img
            src='https://enfocando.es/wp-content/2016/08/Panorama_7490.jpg'
            alt='title-note'
          />
        </div>
      </div>
    </div>
  );
};
