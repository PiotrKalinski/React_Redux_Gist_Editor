import gist from '../../reducers/gist.js';
import * as gistStates from '../../consts/gist-states';
import * as gistsActions from '../../consts/gists-actions';
import * as gistActions from '../../consts/gist-actions';
import * as mockData from './reducer.mock.js';

const id = '1234';
const initialState = {
  state: gistStates.NO_GIST,
  data: {},
  viewer: {},
  orginal: {},
  error: null,
  fetching: false
};

describe('Gist Reducer Test', () => {
  it('should return initial state', () => {
    expect(gist(undefined, {})).toEqual(initialState);
  });
  it('Update Succes', () => {
    expect(
      gist(undefined, {
        payload:id,
        type: gistActions.UPDATE_SUCCESS
      })
    ).toEqual(mockData.update_succed);
  });
  it('Get start - fetching data', () => {
      const mock = { fetching:  true };
      expect(gist(undefined, {
          type: gistActions.GET_START
      })).toMatchObject(mock);
  });
  it('Create start - checking if fetching is enabled - for loading', () => {
    const mock = { fetching:  true };
    expect(gist(undefined, {
        type: gistActions.CREATE_START
    })).toMatchObject(mock);
  });
  it('Get user gist succed', ()=>{
      const mock = { viewer: id, state: gistStates.SELECTED_USER_GIST };
      expect(gist(undefined, {
          payload: id,
          type: gistActions.GET_USER_SUCCESS
      })).toMatchObject(mock);
  });
  it('Get gist succed', ()=>{
    const mock = { data: id, state: gistStates.SELECTED_GIST };
    expect(gist(undefined, {
        payload: id,
        type: gistActions.GET_SUCCESS
    })).toMatchObject(mock);
});
it('Update start ', ()=>{
    const mock = { fetching: true };
    expect(gist(undefined, {
        payload: id,
        type: gistActions.UPDATE_START
    })).toMatchObject(mock);
});
it('Remove start', ()=>{
    const mock = { fetching: true };
    expect(gist(undefined, {
        payload: id,
        type: gistActions.REMOVE_START
    })).toMatchObject(mock);
});
it('Remove succed ', ()=>{
    expect(gist(undefined, {
        payload: id,
        type: gistActions.REMOVE_SUCCESS
    })).toMatchObject(initialState);
});
it('Remove succed ', ()=>{
    expect(gist(undefined, {
        payload: id,
        type: gistActions.REMOVE_SUCCESS
    })).toMatchObject(initialState);
});
it('Create new ', ()=>{
    const mock = { state: gistStates.NEW_GIST };
    expect(gist(undefined, {
        payload: id,
        type: gistActions.CREATE_NEW
    })).toMatchObject(mock);
});
it('Change filter ', ()=>{
    const mock = { state: gistStates.NO_GIST };
    expect(gist(undefined, {
        payload: id,
        type: gistsActions.CHANGE_FILTER
    })).toMatchObject(mock);
});
});
