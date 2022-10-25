import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSingIn, startLoginWithEmailAndPassword } from '../../store/auth/thunks';
import { emptyError } from '../../store/auth';

const initialStateForm = { email: '', password: '' };

export const LoginPage = () => {
  const { formState, onInputChange } = useForm(initialStateForm);
  const { email, password } = formState;
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginWithEmailAndPassword(email, password));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSingIn());
  };

  return (
    <AuthLayout title='Login'>
      <form
        aria-label='submit-form'
        onSubmit={onSubmit}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              name='email'
              value={email}
              onChange={onInputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              name='password'
              value={password}
              onChange={onInputChange}
              fullWidth
              inputProps={{
                'data-testid': 'password',
              }}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error' onClose={() => dispatch(emptyError())}>
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button type='submit' variant='contained' fullWidth disabled={isAuthenticated}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                fullWidth
                onClick={onGoogleSignIn}
                disabled={isAuthenticated}
                aria-label='google-btn'
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
