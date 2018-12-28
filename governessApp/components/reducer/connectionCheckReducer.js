import {CONNECTED} from '../action/actionList';

const initialState = {
  connected: true
};

export default function connectionCheckReducer(state = initialState, action) {
  switch (action.type) {
    case CONNECTED:
      return {
        ...state,
        connected: action.connected
      };
    default:
      return state;
  }
};
