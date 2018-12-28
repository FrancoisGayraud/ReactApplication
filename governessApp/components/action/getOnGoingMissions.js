import {ONGOINGMISSIONS_CALL_ERROR, ONGOINGMISSIONS_CALL_LOADING, ONGOINGMISSIONS_CALL_SUCCESS, ONGOINGMISSIONS_CALL_RESET} from './actionList';
import '../utils/globalVariable';

export function getOnGoingMissionsError(err) {
  return {
    type: ONGOINGMISSIONS_CALL_ERROR,
    error: err
  };
}

export function getOnGoingMissionsReset() {
  return {
    type: ONGOINGMISSIONS_CALL_RESET,
    onGoingMissionsData: null
  }
}

export function getOnGoingMissionsLoading(bool) {
  return {
    type: ONGOINGMISSIONS_CALL_LOADING,
    isLoading: bool
  };
}

export function getOnGoingMissionsSuccess(onGoingMissionsData) {
  return {
    type: ONGOINGMISSIONS_CALL_SUCCESS,
    onGoingMissionsData
  };
}

export function getOnGoingMissions(apiToken) {
  return (dispatch) => {
    dispatch(getOnGoingMissionsLoading(true));

    fetch(API_NOBO_URL + '/governess/mission/ongoing',
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
          'apiToken': apiToken,
        })
      }).then((response) => {
      dispatch(getOnGoingMissionsLoading(false));
      let status = response.status;
      return response.json().then((json) => {
        if (status != 200)
          throw json.message[0];
        return (json);
      })
    })
      .then((onGoingMissionsData) => {
        dispatch(getOnGoingMissionsSuccess(onGoingMissionsData));
      })
      .catch(err => {
        dispatch(getOnGoingMissionsReset());
        dispatch(getOnGoingMissionsError(err));
      });
  };
}
