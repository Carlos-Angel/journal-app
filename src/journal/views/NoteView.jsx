import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';

import { useForm } from '../../hooks';
import { ImageGallery } from '../components';
import { setActiveNote } from '../../store/journal/journal.slice';
import { startSaveNote } from '../../store/journal/thunks';

export const NoteView = () => {
  const { note } = useSelector((state) => state.journal);
  const dispatch = useDispatch();

  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <Button color='primary' sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} onClick={onSaveNote} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          value={title}
          name='title'
          onChange={onInputChange}
          variant='standard'
          fullWidth
          placeholder='Ingrese un título'
          label='Título'
          sx={{ border: 'none', mb: 1 }}
        />

        <TextField
          type='text'
          value={body}
          name='body'
          onChange={onInputChange}
          variant='standard'
          fullWidth
          multiline
          placeholder='¿Qué sucedió en el día de hoy?'
          minRows={5}
        />
      </Grid>

      {/* Image gallery */}
      <ImageGallery />
    </Grid>
  );
};
