import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'hooks/useForm';

export const RegisterScreen = () => {
  const initialValuesForm = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  };
  const [valuesForm, handleInputChange] = useForm(initialValuesForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('values', valuesForm);
  };

  return (
    <>
      <h3 className='auth__title mb-5'>Register</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          className='auth__input'
          autoComplete='off'
          value={valuesForm.name}
          onChange={handleInputChange}
        />
        <input
          type='email'
          name='email'
          placeholder='email'
          className='auth__input'
          autoComplete='off'
          value={valuesForm.email}
          onChange={handleInputChange}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          className='auth__input'
          value={valuesForm.password}
          onChange={handleInputChange}
        />
        <input
          type='password'
          name='confirmPassword'
          placeholder='Confirm password'
          className='auth__input'
          value={valuesForm.confirmPassword}
          onChange={handleInputChange}
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
