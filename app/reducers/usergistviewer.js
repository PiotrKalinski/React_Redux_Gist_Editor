import deepCopy from 'deepcopy';
import * as editorActions from '../consts/editor-actions';
import * as gistActions from '../consts/gist-actions';
import * as gistsActions from '../consts/gists-actions';

const initialState = {
    data: {},
    editing: false,
    search: 'null'
  };


const mapGistToData = (payload) => ({
  description: payload.description,
  files: payload.files,
  id: payload.id
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case gistsActions.UPDATE_SEARCH_FIELD:
      return {
        ...state,
        search:payload
      };
    case gistActions.GET_USER_SUCCESS:
      return {
        ...state,
        editing: false,
        data: mapGistToData(payload)
      };
    default:
      return state;
  }
};
