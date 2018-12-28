import {
  LOGIN_ERROR, LOGIN_LOADING,
  LOGIN_FETCH_DATA_SUCCESS
} from '../action/actionList';

const initialState = {
  loginData: null,
  error: "",
  isLoading: false
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_FETCH_DATA_SUCCESS:
      return {
        ...state,
        loginData: action.loginData
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error
      };
    case LOGIN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
