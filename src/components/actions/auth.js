import { authTypes } from '../types';

export const login = (uuid, displayName) => {
  return {
    type: authTypes.login,
    payload: {
      uuid,
      displayName,
    },
  };
};
