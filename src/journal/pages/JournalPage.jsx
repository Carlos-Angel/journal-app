import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import startNewNote from '../../store/journal/thunks/startNewNote.thunk';

export const JournalPage = () => {
  const { isSaving, note } = useSelector((state) => state.journal);

  const dispatch = useDispatch();
  const onClickNote = () => dispatch(startNewNote());

  return (
    <JournalLayout>
      {note ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
        onClick={onClickNote}
        disabled={isSaving}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
