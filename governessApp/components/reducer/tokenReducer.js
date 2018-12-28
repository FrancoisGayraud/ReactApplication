import {
  TOKEN_LOAD_SUCCESS, TOKEN_ERROR,
  TOKEN_VERIFY_SUCCESS
} from '../action/actionList';

const initialState = {
  token: null,
  error: null,
  verifySuccess: false
};

export default function tokenReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN_LOAD_SUCCESS:
      return {
        ...state,
        token: action.token
      };
    case TOKEN_ERROR:
      return {
        ...state,
        error: action.error
      };
    case TOKEN_VERIFY_SUCCESS:
      return {
        ...state,
        verifySuccess: action.verifySuccess
      };
    default:
      return state;
  }
};
