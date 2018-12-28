import {CLIENTADDRESSES_CALL_ERROR, CLIENTADDRESSES_CALL_LOADING, CLIENTADDRESSES_CALL_SUCCESS} from '../action/actionList';

const initialState = {
  clientAddressesData: null,
  error: "",
  isLoading: false,
};

export default function getClientAdddressesReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENTADDRESSES_CALL_SUCCESS:
      return {
        ...state,
        clientAddressesData: action.clientAddressesData
      };
    case CLIENTADDRESSES_CALL_ERROR:
      return {
        ...state,
        error: action.error
      };
    case CLIENTADDRESSES_CALL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
