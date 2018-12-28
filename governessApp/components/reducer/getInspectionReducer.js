import {INSPECTION_CALL_ERROR, INSPECTION_CALL_LOADING, INSPECTION_CALL_SUCCESS} from '../action/actionList';

const initialState = {
  inspectionData: null,
  error: "",
  isLoading: false
};

export default function getInspectionReducer(state = initialState, action) {
  switch (action.type) {
    case INSPECTION_CALL_SUCCESS:
      return {
        ...state,
        inspectionData: action.inspectionData
      };
    case INSPECTION_CALL_ERROR:
      return {
        ...state,
        error: action.error
      };
    case INSPECTION_CALL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
