import {
  ONGOINGMISSIONS_CALL_ERROR,
  ONGOINGMISSIONS_CALL_LOADING,
  ONGOINGMISSIONS_CALL_SUCCESS,
  ONGOINGMISSIONS_CALL_RESET
} from '../action/actionList';

const initialState = {
  onGoingMissionsData: null,
  error: "",
  isLoading: false,
};

export default function getOnGoingMissionsReducer(state = initialState, action) {
  switch (action.type) {
    case ONGOINGMISSIONS_CALL_SUCCESS:
      return {
        ...state,
        onGoingMissionsData: action.onGoingMissionsData
      };
    case ONGOINGMISSIONS_CALL_ERROR:
      return {
        ...state,
        error: action.error
      };
    case ONGOINGMISSIONS_CALL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case ONGOINGMISSIONS_CALL_RESET:
      return {
        ...state,
        onGoingMissionsData: action.onGoingMissionsData
      }
    default:
      return state;
  }
};
