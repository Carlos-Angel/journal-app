import React from 'react';
import { NoteScreen } from 'components/notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar';

export const JournalScreen = () => {
  return (
    <div className='journal__main-content'>
      <Sidebar />
      <main>{true ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};
