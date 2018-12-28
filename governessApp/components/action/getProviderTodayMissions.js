import {PROVIDERTODAYMISSIONS_CALL_ERROR, PROVIDERTODAYMISSIONS_CALL_LOADING, PROVIDERTODAYMISSIONS_CALL_SUCCESS} from './actionList';
import '../utils/globalVariable';

export function getProviderTDMError(err) {
  return {
    type: PROVIDERTODAYMISSIONS_CALL_ERROR,
    error: err
  };
}

export function getProviderTDMLoading(bool) {
  return {
    type: PROVIDERTODAYMISSIONS_CALL_LOADING,
    isLoading: bool
  };
}

export function getProviderTDMSuccess(providerTDMData) {
  providerTDMData.data.sort((first, second) => first.userId - second.userId);
  return {
    type: PROVIDERTODAYMISSIONS_CALL_SUCCESS,
    providerTDMData
  };
}

export function getProviderTDMInfo(apiToken) {
  return (dispatch) => {
    dispatch(getProviderTDMLoading(true));
    fetch(API_NOBO_URL + '/governess/agenda/today',
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
          'apiToken': apiToken
        })
      }).then((response) => {
      dispatch(getProviderTDMLoading(false));
      let status = response.status;
      return response.json().then((json) => {
        if (status != 200)
          throw json.message[0];
        return (json);
      })
    })
      .then((addressData) => {
        dispatch(getProviderTDMSuccess(addressData));
      })
      .catch(err => {
        dispatch(getProviderTDMError(err));
      });
  };
}
