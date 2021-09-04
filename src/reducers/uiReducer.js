import { authTypes } from 'types';
const initialState = {
  loading: false,
  msgError: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };
    case authTypes.uiRemoveError:
      return {
        ...state,
        msgError: null,
      };

    default:
      return state;
  }
};
