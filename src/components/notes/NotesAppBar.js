import { startSaveNote, startUploading } from 'actions/notes';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const NotesAppBar = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(startSaveNote(note));
  };

  const handlePictureClick = () => {
    console.log('handlePictureClick');
    document.querySelector('#fileSelector').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <div className='notes__appbar'>
      <span>25 de agosto del 2021</span>
      <input
        type='file'
        name='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
        id='fileSelector'
      />
      <div>
        <button className='btn' onClick={handlePictureClick}>
          picture
        </button>
        <button className='btn' onClick={handleSave}>
          save
        </button>
      </div>
    </div>
  );
};
