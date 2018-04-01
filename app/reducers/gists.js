import unionBy from 'lodash.unionby';
import * as gistsActions from '../consts/gists-actions';
import * as gistActions from '../consts/gist-actions';

const initialState = {
  data: [],
  error: null,
  selectedId: null,
  filter: 'all',
  fetching: false,
  search: false
};

export const gists = (state = initialState, { type, payload }) => {
  switch (type) {
    case gistsActions.GET_START:
      return {
        ...state,
        fetching: true,
        error: null,
        search: true
      };
    case gistsActions.GET_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: unionBy(state.data, payload, 'id')
      };
    case gistsActions.GET_STARRED_SUCCESS:
      return {
        ...state,
        data: unionBy(state.data, payload, 'id')
      };
    case gistActions.USER_GIST_SELECT:
    return {
      ...state,
      selectedId: null
    };
    case gistsActions.GET_FAILURE:
      return {
        ...state,
        fetching: false,
        error: payload
      };
    case gistsActions.CHANGE_FILTER:
      return {
        ...state,
        selectedId: 'null',
        filter: payload,
      };
    // Single gist actions
    case gistActions.SELECT:
      return {
        ...state,
        selectedId: payload,
      };
    case gistActions.CREATE_NEW:
      return {
        ...state,
        selectedId: null,
        filter: 'all'
      };
    case gistActions.CREATE_SUCCESS:
      return {
        ...state,
        selectedId: payload.id,
        data: [
          payload,
          ...state.data
        ]
      };
    case gistActions.UPDATE_SUCCESS:
      return {
        ...state,
        // merge gists-previews with full fetched gist
        data: state.data.map(gist => {
          if (gist.id === payload.id) {
            return {
              ...gist,
              ...payload
            };
          }
          return gist;
        })
      };
    case gistActions.REMOVE_SUCCESS:
      return {
        ...state,
        selectedId: null,
        data: state.data.filter(gist => {
          return gist.id !== payload;
        })
      };
    default:
      return state;
  }
};

export default gists;
