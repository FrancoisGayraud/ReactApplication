import {ADDRESS_CALL_ERROR, ADDRESS_CALL_LOADING, ADDRESS_CALL_SUCCESS} from '../action/actionList';

const initialState = {
  addressData: null,
  error: "",
  isLoading: false,
};

export default function getAddressReducer(state = initialState, action) {
  switch (action.type) {
    case ADDRESS_CALL_SUCCESS:
      return {
        ...state,
        addressData: action.addressData
      };
    case ADDRESS_CALL_ERROR:
      return {
        ...state,
        error: action.error
      };
    case ADDRESS_CALL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
