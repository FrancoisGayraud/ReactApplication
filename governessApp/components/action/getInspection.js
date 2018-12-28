import {INSPECTION_CALL_ERROR, INSPECTION_CALL_LOADING, INSPECTION_CALL_SUCCESS} from './actionList';
import '../utils/globalVariable';
import Snackbar from 'react-native-snackbar';

export function getInspectionError(err) {
  return {
    type: INSPECTION_CALL_ERROR,
    error: err
  };
}

export function getInspectionLoading(bool) {
  return {
    type: INSPECTION_CALL_LOADING,
    isLoading: bool
  };
}

export function getInspectionSuccess(inspectionData) {
  return {
    type: INSPECTION_CALL_SUCCESS,
    inspectionData
  };
}

export function getInspection(apiToken, page) {
  return (dispatch, getState) => {
    dispatch(getInspectionLoading(true));
    curState = getState();
    fetch(API_NOBO_URL + '/governess/inspection/page/' + page,
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application/json',
          'apiToken': apiToken,
        })
      }).then((response) => {
      dispatch(getInspectionLoading(false));
      let status = response.status;
      return response.json().then((json) => {
        if (status != 200) {
          if (status == 404 && !curState.getInspectionReducer.error)
            Snackbar.show({
              title: 'Toutes les inspections ont été récupérées',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: uiTheme.palette.accentColor
            });
          throw json.message[0];
        }
        return (json);
      });
    })
      .then((inspectionData) => {
      if (page === 1) {
        dispatch(getInspectionSuccess(inspectionData));
      } else {
        if (curState.getInspectionReducer.inspectionData !== null) {
          let curData = curState.getInspectionReducer.inspectionData.data;
          let fullData = curData.concat(inspectionData.data).filter((val, index, array) => {
            return array.map(obj => obj.id).indexOf(val.id) === index
          });
          inspectionData.data = fullData;
        }
        dispatch(getInspectionSuccess(inspectionData));
      }
      })
      .catch(err => {
        dispatch(getInspectionError(err));
      });
  };
}
