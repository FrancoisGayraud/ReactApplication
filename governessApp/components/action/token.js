import {
  TOKEN_LOAD_SUCCESS, TOKEN_ERROR,
  TOKEN_VERIFY_SUCCESS
} from './actionList';
import '../utils/globalVariable';
import * as Keychain from 'react-native-keychain';

//Key used to store the apiToken and userId of the last person connected
const tokenKey = 'TOKEN_KEY';

export function tokenError(error) {
  return {
    type: TOKEN_ERROR,
    error
  };
}

export function tokenLoad(token) {
  return {
    type: TOKEN_LOAD_SUCCESS,
    token
  };
}

export function tokenVerifySuccess(bool) {
  return {
    type: TOKEN_VERIFY_SUCCESS,
    verifySuccess: bool
  };
}

export function tokenSave(token, userId = '0') {
  return (dispatch) => {
    dispatch(tokenLoad({apiToken: token, userId: userId}))
    Keychain
      .setGenericPassword(tokenKey, token + ';' + userId)
      .catch((err) => {
        dispatch(tokenError('Could not save token'));
      });
  };
}

export function tokenReset() {
  return (dispatch) => {
    Keychain
      .resetGenericPassword()
      .then((credentials) => {
        dispatch(tokenLoad(null));
      })
      .catch(err => {
        dispatch(tokenError('Couldn\'t reset token'));
      });
  };
}

export function tokenGet() {
  return (dispatch) => {
    Keychain
      .getGenericPassword()
      .then((credentials) => {
        if (credentials) {
          const tokens = credentials.password.split(';');
          dispatch(tokenLoad({
            apiToken: tokens[0],
            userId: tokens[1]
          }));
        }
        else {
          dispatch(tokenLoad({
            apiToken: 'noToken',
            userId: 'noToken'
          }));
        }
      })
      .catch(err => {
        dispatch(tokenError('Couldn\'t get token'));
      });
  };
}

export function tokenVerify(token) {
  return (dispatch) => {
    fetch(API_NOBO_URL + "/auth/isValid/apiToken",
      {
        method: 'get',
        headers: new Headers({
          'content-type': 'application-json',
          'apiToken': token
        })
      })
      .then((response) => {
        if (response.status != 200) {
          dispatch(tokenReset());
          throw Error(response.status);
        }
        return (response.json());
      })
      .then((response) => {
        dispatch(tokenVerifySuccess(true));
      })
      .catch(err => {
        dispatch(tokenError('Couldn\'t verify token'));
      });
  };
}
