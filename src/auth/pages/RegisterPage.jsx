import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterUserWithEmailAndPassword } from '../../store/auth/thunks';
import { emptyError } from '../../store/auth';
import { useForm } from '../../hooks';
import { useMemo } from 'react';

export const RegisterPage = () => {
  const { formState, onInputChange } = useForm({ email: '', password: '', displayName: '' });
  const { email, password, displayName } = formState;

  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startRegisterUserWithEmailAndPassword({ email, password, displayName }));
  };

  return (
    <AuthLayout title='Crear cuenta'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Nombre completo'
              type='text'
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              placeholder='Nombre completo'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='email'
              name='email'
              value={email}
              onChange={onInputChange}
              placeholder='correo@google.com'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              name='password'
              value={password}
              onChange={onInputChange}
              placeholder='Contraseña'
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error' onClose={() => dispatch(emptyError())}>
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button variant='contained' fullWidth type='submit' disabled={isAuthenticated}>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
