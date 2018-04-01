import { action } from './index';
import * as editorActions from '../consts/editor-actions';

export const turnEditOn = () => {
    return dispatch => {
        dispatch(action(editorActions.EDITOR_ON));
    };
};

export const discardChanges = () => {
    return dispatch => {
        dispatch(action(editorActions.DISCARD_CHANGES));
    };
};

export const updateDescription = (data) => {
    return dispatch => {
        dispatch(action(editorActions.UPDATE_DESCRIPTION, data));
    };
};

export const updateFiles = (data) => {
    return dispatch => {
        dispatch(action(editorActions.UPDATE_FILES, data));
    };
};
