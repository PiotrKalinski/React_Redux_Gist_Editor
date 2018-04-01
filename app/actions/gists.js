import GitHub from 'github-api';
import Client from '../utils/client';
import { action } from './index';
import * as gistsActions from '../consts/gists-actions';

const getGists = (token) => {
  const gitHub = new GitHub({ token });

  return gitHub
    .getUser()
    .listGists()
    .then(
      ({ data }) => { return data; },
      err => { dispatch(action(gistsActions.Failure(err))); }
    );
};

const getUserGist = ( token, login ) => {
    const github = new GitHub({ token });

    return github
    .getUser(login)
    .listGists()
    .then(
        ({ data }) => { return data; },
        err => { dispatch(action(gistsActions.Failure(err)));}
    );
};

const getUserStarredGists = (token, login ) => {

    return Client(token).get('users/' + login + '/gists/starred')
    .then(
        ({ data }) => {
            return data.map(gists => ({ ...gists, starred: true }));
        },
        err => { dispatch(action(gistsActions.Failure(err)));}
    );
};

const getStarredGists = (token) => {
  return Client(token).get('gists/starred')
    .then(
      ({ data }) => {
        return data.map(gists => ({ ...gists, starred: true }));
      },
      err => { dispatch(action(gistsActions.Failure(err))); }
    );
};
export const searchGists = ( token, login ) => {
    return dispatch => {
        dispatch(action(gistsActions.GET_USER_START));

        getUserGist(token, login)
        .then(gists => {
            dispatch(action(gistsActions.GET_USER_SUCCED, gists));
        });
    };
};

export const changeSearchValue = (data) => {
    return dispatch => dispatch(action(gistsActions.UPDATE_SEARCH_FIELD, data));
};

export const getAllGists = (token) => {
  return dispatch => {
    dispatch(action(gistsActions.GET_START));

    getStarredGists(token)
      .then(starred => {
        dispatch(action(gistsActions.GET_STARRED_SUCCESS, starred));
        return getGists(token);
      })
      .then(gists => {
        dispatch(action(gistsActions.GET_SUCCESS, gists));
      });
  };
};

export const changeFilter = (filter) => {
  return dispatch => {
    dispatch(action(gistsActions.CHANGE_FILTER, filter));
    console.log(';x');
  };
};
