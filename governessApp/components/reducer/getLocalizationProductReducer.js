import {LOCALIZATION_PRODUCT_CALL_ERROR, LOCALIZATION_PRODUCT_CALL_LOADING, LOCALIZATION_PRODUCT_CALL_SUCCESS} from '../action/actionList';

const initialState = {
  localizationProductData: null,
  error: "",
  isLoading: false,
};

export default function getLocalizationProductReducer(state = initialState, action) {
  switch (action.type) {
    case LOCALIZATION_PRODUCT_CALL_SUCCESS:
      return {
        ...state,
        localizationProductData: action.localizationProductData
      };
    case LOCALIZATION_PRODUCT_CALL_ERROR:
      return {
        ...state,
        error: action.error
      };
    case LOCALIZATION_PRODUCT_CALL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
