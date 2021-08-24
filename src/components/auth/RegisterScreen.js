import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
  return (
    <>
      <h3 className='auth__title mb-5'>Register</h3>
      <form>
        <input
          type='text'
          name='name'
          placeholder='Name'
          className='auth__input'
          autocomplete='off'
        />
        <input
          type='email'
          name='email'
          placeholder='email'
          className='auth__input'
          autocomplete='off'
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          className='auth__input'
        />
        <input
          type='password'
          name='confirm-password'
          placeholder='Confirm password'
          className='auth__input'
        />
        <button className='mb-5 btn btn-primary btn-block' type='submit'>
          Register
        </button>
      </form>
      <Link className='mt-5 link' to='/auth/login'>
        Already registered, sign in?
      </Link>
    </>
  );
};
