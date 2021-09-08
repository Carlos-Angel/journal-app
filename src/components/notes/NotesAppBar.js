import { startSaveNote } from 'actions/notes';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const NotesAppBar = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(startSaveNote(note));
  };

  return (
    <div className='notes__appbar'>
      <span>25 de agosto del 2021</span>
      <div>
        <button className='btn'>picture</button>
        <button className='btn' onClick={handleSave}>
          save
        </button>
      </div>
    </div>
  );
};
