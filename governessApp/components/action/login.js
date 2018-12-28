import {LOGIN_ERROR, LOGIN_LOADING, LOGIN_FETCH_DATA_SUCCESS} from './actionList';
import '../utils/globalVariable';


export function loginError(err) {
  return {
    type: LOGIN_ERROR,
    error: err
  };
}

export function loginLoading(bool) {
  return {
    type: LOGIN_LOADING,
    isLoading: bool
  };
}

export function loginAuthenticationSuccess(loginData) {
  return {
    type: LOGIN_FETCH_DATA_SUCCESS,
    loginData
  };
}

export function loginReset() {
  return (dispatch) => {
    dispatch(loginError(false));
    dispatch(loginLoading(false));
  };
}

export function loginAuthenticate(username, password) {
  return (dispatch) => {
    dispatch(loginLoading(true));
    fetch(API_NOBO_URL + "/auth/authenticate",
      {
        method: 'post',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
          email: username,
          password: password
        })
      }).then((response) => {
      dispatch(loginLoading(false));
      let status = response.status;
      return response.json().then((json) => {
        if (status != 200)
          throw json.message[0];
        return (json);
      });
    })
      .then((loginData) => {
        dispatch(loginAuthenticationSuccess(loginData));
      })
      .catch(err => {
        dispatch(loginError(err));
      });
  };
}
