import gists from '../../reducers/gists.js';
import * as gistStates from '../../consts/gist-states';
import * as gistsActions from '../../consts/gists-actions';
import * as gistActions from '../../consts/gist-actions';
import * as mockData from './reducer.mock.js';

const initialState = {
    data: [],
    error: null,
    selectedId: null,
    filter: 'all',
    fetching: false,
    search: false
  };
const id = 'test';

describe('Gists reducer testes', () =>{
    it('Get start - fetching data', () => {
        const mock = { fetching: true, error: null, search: true };
        expect(gists(undefined, {
            payload: id,
            type: gistsActions.GET_START
        })).toMatchObject(mock);
    });
    it('User gist select', () => {
        const mock = { selectedId: null };
        expect(gists(undefined, {
            type: gistActions.USER_GIST_SELECT
        })).toMatchObject(mock);
    });
});
