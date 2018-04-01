import cookie from 'js-cookie';
import GitHub from 'github-api';
import * as authActions from '../consts/auth-action';
import COOKIE_NAME from '../consts/cookie-name';

const getTokenFromCookies = () => {
  return cookie.get(COOKIE_NAME);
};

const authStart = token => ({
  type: authActions.START,
  payload: token
});

const authSuccess = data => ({
  type: authActions.SUCCESS,
  payload: data
});

const authFailure = err => ({
  type: authActions.FAILURE,
  payload: { err }
});

export const logOut = () => {
  return dispatch => {
    cookie.remove(COOKIE_NAME);
    dispatch({ type: authActions.LOG_OUT });
  };
};

export const authenticate = () => {
  return dispatch => {
    const token = getTokenFromCookies();
    dispatch(authStart(token));
    if (!token || token === 'null') {
      return dispatch(logOut());
    }

    const github = new GitHub({ token });

    return github
      .getUser()
      .getProfile()
      .then(
        ({ data }) => {
          dispatch(authSuccess(data));
          console.log(data);
        },
        err => {
          dispatch(authFailure(err));
        }
      );
  };
};
