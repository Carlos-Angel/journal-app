import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from 'actions/ui';
import { useForm } from 'hooks/useForm';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const initialValuesForm = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  };
  const [{ email, name, password, confirmPassword }, handleInputChange] =
    useForm(initialValuesForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(removeError());
    }
  };

  const isFormValid = () => {
    if (validator.isEmpty(name)) {
      dispatch(setError('name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('email is not valid'));
      return false;
    } else if (!validator.equals(password, confirmPassword)) {
      dispatch(setError('password should be match each other'));
      return false;
    } else if (!validator.isLength(password, { min: 8 })) {
      dispatch(setError('password should be at least 8 characters'));
      return false;
    }
    return true;
  };

  return (
    <>
      <h3 className='auth__title mb-5'>Register</h3>
      <form onSubmit={handleSubmit}>
        {msgError && <div className='auth__alert-error'>{msgError}</div>}
        <input
          type='text'
          name='name'
          placeholder='Name'
          className='auth__input'
          autoComplete='off'
          value={name}
          onChange={handleInputChange}
        />
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
        <input
          type='password'
          name='confirmPassword'
          placeholder='Confirm password'
          className='auth__input'
          value={confirmPassword}
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
