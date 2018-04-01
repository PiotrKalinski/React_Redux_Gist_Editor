import deepcopy from 'deepcopy';
import * as gistActions from '../consts/gist-actions';
import * as gistStates from '../consts/gist-states';
import * as gistsActions from '../consts/gists-actions';

const initialState = {
  state: gistStates.NO_GIST,
  data: {},
  viewer:{},
  orginal: {},
  error: null,
  fetching: false,
};

export const gist = (state = initialState, { type, payload }) => {
  switch (type) {
    case gistActions.GET_START:
      return {
        ...state,
        fetching: true
      };
    case gistActions.CREATE_START:
      return {
        ...state,
        fetching: true
      };
    case gistActions.GET_USER_SUCCESS:
    return {
      ...state,
      viewer: payload,
      state: gistStates.SELECTED_USER_GIST
    };
    case gistActions.GET_SUCCESS:
      return {
        ...state,
        data: payload,
        orginal: deepcopy(payload),
        fetching: false,
        state: gistStates.SELECTED_GIST
      };
    case gistActions.UPDATE_START:
      return {
        ...state,
        fetching: true,
      };
    case gistActions.UPDATE_SUCCESS:
      return {
        ...state,
        data: payload,
        fetching: false,
      };
    case gistActions.REMOVE_START:
      return {
        ...state,
        fetching: true
      };
    case gistActions.REMOVE_SUCCESS:
      return {
        ...initialState
      };
    case gistActions.FAILURE:
      return {
        ...state,
        error: payload,
        fetching: false
      };
    case gistActions.SELECT:
      return {
        ...state,
        state: gistStates.SELECTED_GIST
      };
    case gistActions.CREATE_NEW:
      return {
        ...state,
        state: gistStates.NEW_GIST,
      };
    case gistsActions.CHANGE_FILTER:
      return {
        ...state,
        state: gistStates.NO_GIST
      };
    default:
      return state;
  }
};

export default gist;
