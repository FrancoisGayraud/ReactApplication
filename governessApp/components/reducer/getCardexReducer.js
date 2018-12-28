import {CARDEX_CALL_ERROR, CARDEX_CALL_LOADING, CARDEX_CALL_SUCCESS} from '../action/actionList';

const initialState = {
  cardexData: null,
  error: "",
  isLoading: false,
};

export default function getCardexReducer(state = initialState, action) {
  switch (action.type) {
    case CARDEX_CALL_SUCCESS:
      return {
        ...state,
        cardexData: action.cardexData
      };
    case CARDEX_CALL_ERROR:
      return {
        ...state,
        error: action.error
      };
    case CARDEX_CALL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
