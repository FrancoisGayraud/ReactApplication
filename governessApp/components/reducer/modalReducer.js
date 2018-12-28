import {MODAL_VISIBLE} from '../action/actionList';

const initialState = {
  isVisible: false
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_VISIBLE:
      return {
        ...state,
        isVisible: action.isVisible
      };
    default:
      return state;
  }
};
