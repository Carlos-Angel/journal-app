import { authTypes } from 'types';

export const setError = (message) => {
  return {
    type: authTypes.uiSetError,
    payload: message,
  };
};

export const removeError = () => {
  return {
    type: authTypes.uiRemoveError,
  };
};

export const startLoading = () => {
  return {
    type: authTypes.uiStartLoading,
  };
};

export const finishLoading = () => {
  return {
    type: authTypes.uiFinishLoading,
  };
};
