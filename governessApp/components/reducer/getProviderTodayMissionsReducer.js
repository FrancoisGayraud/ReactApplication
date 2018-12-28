import {PROVIDERTODAYMISSIONS_CALL_ERROR, PROVIDERTODAYMISSIONS_CALL_LOADING, PROVIDERTODAYMISSIONS_CALL_SUCCESS} from '../action/actionList';

const initialState = {
  TDMData: null,
  error: "",
  isLoading: false,
};

export default function getProviderTDMReducer(state = initialState, action) {
  switch (action.type) {
    case PROVIDERTODAYMISSIONS_CALL_SUCCESS:
      return {
        ...state,
        TDMData: action.providerTDMData
      };
    case PROVIDERTODAYMISSIONS_CALL_ERROR:
      return {
        ...state,
        error: action.error
      };
    case PROVIDERTODAYMISSIONS_CALL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
