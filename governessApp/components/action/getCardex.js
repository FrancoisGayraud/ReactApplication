import {CARDEX_CALL_ERROR, CARDEX_CALL_LOADING, CARDEX_CALL_SUCCESS} from './actionList';
import '../utils/globalVariable';

export function getCardexError(err) {
  return {
    type: CARDEX_CALL_ERROR,
    error: err
  };
}

export function getCardexLoading(bool) {
  return {
    type: CARDEX_CALL_LOADING,
    isLoading: bool
  };
}

export function getCardexSuccess(cardexData) {
  return {
    type: CARDEX_CALL_SUCCESS,
    cardexData
  };
}

export function resetCardexData() {
    return (dispatch) => {
      dispatch(getCardexSuccess(null));
    };
}

export function getCardex(apiToken, missionId = -1, addressId = -1) {
  return (dispatch) => {
    let URL = API_NOBO_URL;
    dispatch(getCardexLoading(true));
    if (addressId === -1) {
      URL = URL + '/governess/mission/' + missionId + '/cardex';
    }
    else if(missionId === -1) {
      URL = URL + '/governess/address/' + addressId + '/cardex';
    }
    fetch(URL,
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
          'apiToken': apiToken,
        })
      }).then((response) => {
      dispatch(getCardexLoading(false));
      let status = response.status;
      return response.json().then((json) => {
        if (status != 200)
          throw json.message[0];
        return (json);
      })
    })
      .then((cardexData) => {
        dispatch(getCardexSuccess(cardexData));
      })
      .catch(err => {
        dispatch(getCardexError(err));
      });
  };
}
