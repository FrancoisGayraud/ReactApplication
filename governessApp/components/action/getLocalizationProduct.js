import {LOCALIZATION_PRODUCT_CALL_ERROR, LOCALIZATION_PRODUCT_CALL_LOADING, LOCALIZATION_PRODUCT_CALL_SUCCESS} from './actionList';
import '../utils/globalVariable';

export function getLocalizationProductError(err) {
  return {
    type: LOCALIZATION_PRODUCT_CALL_ERROR,
    error: err
  };
}

export function getLocalizationProductLoading(bool) {
  return {
    type: LOCALIZATION_PRODUCT_CALL_LOADING,
    isLoading: bool
  };
}

export function getLocalizationProductSuccess(localizationProductData) {
  return {
    type: LOCALIZATION_PRODUCT_CALL_SUCCESS,
    localizationProductData
  };
}

export function getLocalizationProduct(apiToken, addressId) {
  return (dispatch) => {
    var URL = API_NOBO_URL + '/governess/address/product/' + addressId;
    dispatch(getLocalizationProductLoading(true));
    fetch(URL,
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
          'apiToken': apiToken,
        })
      }).then((response) => {
      dispatch(getLocalizationProductLoading(false));
      let status = response.status;
      return response.json().then((json) => {
        if (status != 200)
          throw json.message[0];
        return (json);
      })
    })
      .then((localizationProductData) => {
        dispatch(getLocalizationProductSuccess(localizationProductData));
      })
      .catch(err => {
        dispatch(getLocalizationProductError(err));
      });
  };
}
