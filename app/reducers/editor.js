import deepCopy from 'deepcopy';
import * as editorActions from '../consts/editor-actions';
import * as gistActions from '../consts/gist-actions';

const initialState = {
    data: {},
    editing: false,
    search: 'null'
  };

const newGistData = {
  description: 'gist description',
  files: {
    'file': {
      filename: 'file name',
      content: ''
    }
  },
};

const mapGistToData = (payload) => ({
  description: payload.description,
  files: payload.files,
  id: payload.id
});

export const editor = (state = initialState, { type, payload }) => {
  switch (type) {
    case gistActions.CREATE_NEW:
      return {
        data: deepCopy(newGistData),
        editing: true
      };
    case gistActions.GET_SUCCESS:
      return {
        ...state,
        editing: false,
        data: mapGistToData(payload)
      };
    case gistActions.UPDATE_SUCCESS:
      return {
        ...state,
        editing: false,
        data: mapGistToData(payload)
      };
    case editorActions.EDITOR_ON:
      return {
        ...state,
        editing: true
      };
    case editorActions.DISCARD_CHANGES:
      return {
        ...state,
        editing: false,
        data: mapGistToData(payload)
      };
    case editorActions.UPDATE_DESCRIPTION:
      // payload = description body
      return {
        ...state,
        data: {
          ...state.data,
          description: payload
        }
      };
    case editorActions.UPDATE_FILES:
      // payload = new file object (must have unique or matching key)
      return {
        ...state,
        data: {
          ...state.data,
          files: {
            ...state.data.files,
            ...payload
          }
        }
      };
    default:
      return state;
  }
};

export default editor;
