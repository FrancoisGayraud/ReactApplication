import {CLIENTADDRESSES_CALL_ERROR, CLIENTADDRESSES_CALL_LOADING, CLIENTADDRESSES_CALL_SUCCESS} from './actionList';
import '../utils/globalVariable';

export function clientAddressesError(err) {
  return {
    type: CLIENTADDRESSES_CALL_ERROR,
    error: err
  };
}

export function clientAddressesLoading(bool) {
  return {
    type: CLIENTADDRESSES_CALL_LOADING,
    isLoading: bool
  };
}

export function clientAddressesSuccess(clientAddressesData) {
  return {
    type: CLIENTADDRESSES_CALL_SUCCESS,
    clientAddressesData
  };
}

export function getClientAddresses(apiToken) {
  return (dispatch) => {
    dispatch(clientAddressesLoading(true));

    fetch(API_NOBO_URL + '/governess/address',
    {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
          'apiToken': apiToken
        })
      }).then((response) => {
      dispatch(clientAddressesLoading(false));
      let status = response.status;
      return response.json().then((json) => {
        if (status != 200)
          throw json.message[0];
        return (json);
      })
    })
      .then((clientAddressesData) => {
        dispatch(clientAddressesSuccess(clientAddressesData));
      })
      .catch(err => {
        dispatch(clientAddressesError(err));
      });
  };
}
