import unionBy from 'lodash.unionby';
import * as gistsActions from '../consts/gists-actions';
import * as gistActions from '../consts/gist-actions';
import * as gistStates from '../consts/gist-states';

const initialState = {
  data: [],
  state: gistStates.NO_GIST,
  error: null,
  selectedId: null,
  filter: 'all',
  fetching: false,
  search: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case gistsActions.GET_USER_START:
      return {
        ...state,
        fetching: true,
        error: null,
        search: true,
        data:[]
      };
    case gistsActions.UPDATE_SEARCH_FIELD:
    return {
    ...state,
    search:payload
    };
    case gistActions.GET_USER_SUCCESS:
    return {
      ...state,
      state: gistStates.SELECTED_GIST
    };
    case gistActions.GET_SUCCESS:
    return {
      ...state,
      selectedId: null
    };
    case gistsActions.GET_USER_SUCCED:
      return {
        ...state,
        fetching: false,
        data: unionBy(state.data, payload, 'id'),
        state: gistsActions.GET_USER_SUCCED
      };
    case gistsActions.GET_USER_FAIL:
      return {
        ...state,
        fetching: false,
        error: payload
      };
    case gistsActions.FILTER_USER_CHANGE:
      return {
        ...state,
        selectedId: 'null',
        filter: payload,
      };
    // Single gist actions
    case gistActions.USER_GIST_SELECT:
      return {
        ...state,
        selectedId: payload,
      };
    default:
      return state;
  }
};
