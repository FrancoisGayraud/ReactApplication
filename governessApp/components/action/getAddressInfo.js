import {ADDRESS_CALL_ERROR, ADDRESS_CALL_LOADING, ADDRESS_CALL_SUCCESS} from './actionList';
import '../utils/globalVariable';

export function getAddressError(err) {
  return {
    type: ADDRESS_CALL_ERROR,
    error: err
  };
}

export function getAddressLoading(bool) {
  return {
    type: ADDRESS_CALL_LOADING,
    isLoading: bool
  };
}

export function getAddressSuccess(addressData) {
  return {
    type: ADDRESS_CALL_SUCCESS,
    addressData
  };
}

export function getAddressInfo(apiToken, addressId) {
  return (dispatch) => {
    dispatch(getAddressLoading(true));

    fetch(API_NOBO_URL + '/governess/address/' + addressId,
      {
        method: 'get',
        headers: new Headers({
          'content-type': '/application/json',
          'apiToken': apiToken,
        })
      }).then((response) => {
          console.log(response);
      dispatch(getAddressLoading(false));
      status = response.status;
      return response.json().then((json) => {
        if (status != 200)
          throw json.message[0];
        return (json);
      })
    })
      .then((addressData) => {
        dispatch(getAddressSuccess(addressData));
      })
      .catch(err => {
        dispatch(getAddressError(err));
      });
  };
}
