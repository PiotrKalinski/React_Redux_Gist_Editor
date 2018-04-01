import GitHub from 'github-api';
import { action } from './index';
import * as gistActions from '../consts/gist-actions';
import * as gistsActions from '../consts/gists-actions';

const gistSelected = (id) => ({
  type: gistActions.SELECT,
  payload: id
});

const gistGetStart = (id) => ({
  type: gistActions.GET_START,
  payload: id
});

const userGistGetStart = (id) => ({
  type: gistActions.GET_USER_START,
  payload: id
});

const userGistSelect = (id) => ({
  type: gistActions.USER_GIST_SELECT,
  payload:id
});

const userGistGetSuccess = (data) => ({
  type: gistActions.GET_USER_SUCCESS,
  payload: data
});

const gistGetSuccess = (data) => ({
  type: gistActions.GET_SUCCESS,
  payload: data
});

const gistUpdateStart = (data) => ({
  type: gistActions.UPDATE_START,
  payload: data
});



const gistUpdateSuccess = (data) => ({
  type: gistActions.UPDATE_SUCCESS,
  payload: data
});

const gistSearchUpdate = (data) => ({
  type: gistsActions.UPDATE_SEARCH_FIELD,
  payload: data
});

const gistRemoveStart = () => ({
  type: gistActions.REMOVE_START
});

const gistRemoveSuccess = (id) => ({
  type: gistActions.REMOVE_SUCCESS,
  payload: id
});

const gistFailure = (err) => ({
  type: gistActions.FAILURE,
  payload: err
});

const gistCreateNew = () => ({
  type: gistActions.CREATE_NEW
});

export const createNewGist = () => {
  return dispatch => {
    dispatch(gistCreateNew());
  };
};

export const saveNewGist = (token, gist) =>  {
  return dispatch => {
    dispatch(action(gistActions.CREATE_START));

    const gitHub = new GitHub({ token });

    return gitHub
      .getGist()
      .create(gist)
      .then(
        ({ data } ) => {
          dispatch(action(gistActions.CREATE_SUCCESS, data));
          dispatch(action(gistActions.GET_SUCCESS, data));
        },
        ({ err }) => dispatch(action(gistActions.FAILURE, err))
      );
  };
};

export const updateGist = (token, gist) => {
  return dispatch => {
    dispatch(gistUpdateStart(gist));

    const gitHub = new GitHub({ token });

    return gitHub
      .getGist(gist.id)
      .update(gist)
      .then(
        ({ data }) => {
          dispatch(gistUpdateSuccess(data));
          dispatch(gistSearchUpdate(data));
         },
        ({ err }) => { dispatch(gistFailure(err)); }
      );
  };
};

export const removeGist = (token, id) => {
  return dispatch => {
    const gitHub = new GitHub({ token });
    dispatch(gistRemoveStart());

    return gitHub
      .getGist(id)
      .delete()
      .then(
        res => {
          if (res.status === 204) {
            dispatch(gistRemoveSuccess(id));
          }
        },
        err => { dispatch(gistFailure(err)); }
      );
  };
};

export const selectGist = (token, id) => {
  return dispatch => {
    dispatch(gistGetStart(id));
    dispatch(gistSelected(id));

    const gitHub = new GitHub({ token });

    return gitHub
      .getGist(id)
      .read()
      .then(
        ({ data }) => {
          dispatch(gistGetSuccess(data));
         },
        ({ err }) => { dispatch(gistFailure(err)); }
      );
  };
};

export const userSelectGist = (token, id) => {
  return dispatch => {
    dispatch(userGistGetStart(id));
    dispatch(userGistSelect(id));
    const github = new GitHub({ token });
    return github
    .getGist(id)
    .read()
    .then(
      ({ data }) => {
        dispatch(userGistGetSuccess(data));
      },
      ({ err }) => { dispatch(gistFailure(err));}
    );
  };
};

