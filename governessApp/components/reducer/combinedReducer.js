// components/reducer/rootReducer.js

import {combineReducers} from 'redux';
import modalReducer from "./modalReducer";
import loginReducer from "./loginReducer";
import tokenReducer from "./tokenReducer";
import getInspectionReducer from "./getInspectionReducer";
import getOnGoingMissionsReducer from "./getOnGoingMissionsReducer";
import getCardexReducer from "./getCardexReducer";
import getLocalizationProductReducer from "./getLocalizationProductReducer";
import getAddressInfoReducer from "./getAddressInfoReducer";
import getClientAddressesReducer from "./getClientAddressesReducer";
import connectionCheckReducer from "./connectionCheckReducer";
import getProviderTDMReducer from "./getProviderTodayMissionsReducer";

export default combineReducers({
  tokenReducer,
  loginReducer,
  modalReducer,
  getInspectionReducer,
  getOnGoingMissionsReducer,
  getCardexReducer,
  getAddressInfoReducer,
  getClientAddressesReducer,
  getLocalizationProductReducer,
  connectionCheckReducer,
  getProviderTDMReducer
});
