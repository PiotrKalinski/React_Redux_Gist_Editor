import editor from '../../reducers/editor.js';
import * as gistStates from '../../consts/gist-states';
import * as gistsActions from '../../consts/gists-actions';
import * as gistActions from '../../consts/gist-actions';
import * as mockData from './reducer.mock.js';
import * as editorActions from '../../consts/editor-actions';
const containDeep = require('jest-expect-contain-deep');
const id = '1234';
describe('Editor reducer tests', () => {
    it('should create new', () =>{
        expect(editor(undefined, {
            type: gistActions.CREATE_NEW
        })).toEqual(containDeep({
            data:mockData.newGistData
        }));
    });
    it('should set data ', () => {
        expect(editor(undefined, {
            payload: mockData.gistPayload,
            type: gistActions.GET_SUCCESS
        })).toEqual(containDeep({
            data: mockData.gistPayload
        }));
    });
    it('Update Success -  set data ', () => {
        expect(editor(undefined, {
            payload: mockData.gistPayload,
            type: gistActions.UPDATE_SUCCESS
        })).toEqual(containDeep({
            data: mockData.gistPayload
        }));
    });
    it('Update Success -  eiditing false', () => {
        const mock = { editing: false };
        expect(editor(undefined, {
            payload: mockData.gistPayload,
            type: gistActions.UPDATE_SUCCESS
        })).toMatchObject(mock);
    });
    it('Editor On - editing true', () => {
        const mock = { editing: true };
        expect(editor(undefined, {
            type: editorActions.EDITOR_ON
        })).toMatchObject(mock);
    });
    it('Discard changes - editing false', () => {
        const mock = { editing: false };
        expect(editor(undefined, {
            payload: mockData.gistPayload,
            type: editorActions.DISCARD_CHANGES
        })).toMatchObject(mock);
    });
    it('Discard changes - payload to data', () => {
        expect(editor(undefined, {
            payload: mockData.gistPayload,
            type: editorActions.DISCARD_CHANGES
        })).toEqual(containDeep({
            data: mockData.gistPayload
        }));
    });
    it('Update description - payload to data', () => {
        const mock ={ data: { description: id } };
        expect(editor(undefined, {
            payload: id,
            type: editorActions.UPDATE_DESCRIPTION
        })).toMatchObject(mock);
    });
    it('Update description - payload to data', () => {
        const mock ={ data: { files: mockData.updateFile } };
        expect(editor(undefined, {
            payload: mockData.updateFile,
            type: editorActions.UPDATE_FILES
        })).toMatchObject(mock);
    });
});
