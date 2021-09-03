import { authTypes } from 'types';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case authTypes.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };
    case authTypes.logout:
      return {};
    default:
      return state;
  }
};
