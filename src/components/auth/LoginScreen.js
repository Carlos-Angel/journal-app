import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useForm } from 'hooks/useForm';
import {
  startLoginWithEmailAndPassword,
  startGoogleLogin,
} from '../../actions/auth';
import { setError, removeError } from 'actions/ui';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { msgError, loading } = useSelector((state) => state.ui);

  const [{ email, password }, handleInputChange] = useForm({
    email: '',
    password: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(removeError());
      dispatch(startLoginWithEmailAndPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const isFormValid = () => {
    if (validator.isEmpty(email)) {
      dispatch(setError('email is required'));
      return false;
    } else if (validator.isEmpty(password)) {
      dispatch(setError('password is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('email is not valid'));
      return false;
    }
    return true;
  };

  return (
    <>
      <h3 className='auth__title mb-5'>LoginScreen</h3>
      <form
        onSubmit={handleLogin}
        className='animate__animated animate__fadeIn animate__faster'
      >
        {msgError && <div className='auth__alert-error'>{msgError}</div>}
        <input
          type='email'
          name='email'
          placeholder='email'
          className='auth__input'
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          className='auth__input'
          value={password}
          onChange={handleInputChange}
        />
        <button
          className='btn btn-primary btn-block'
          type='submit'
          disabled={loading}
        >
          Login
        </button>
      </form>
      <hr />
      <div className='auth__social-networks'>
        <p>Login with social networks</p>
        <div className='google-btn' onClick={handleGoogleLogin}>
          <div className='google-icon-wrapper'>
            <img
              className='google-icon'
              src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
              alt='google button'
            />
          </div>
          <p className='btn-text'>
            <b>Sign in with google</b>
          </p>
        </div>

        <Link className='mt-5 link' to='/auth/register'>
          Create a new Account
        </Link>
      </div>
    </>
  );
};
