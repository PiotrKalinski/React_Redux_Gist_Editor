import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import gists from './gists';
import gist from './gist';
import editor from './editor';
import usergists from './usergists';
import usergistviewer from './usergistviewer';


export default combineReducers({
  router: routerReducer,
  gists,
  editor,
  gist,
  auth,
  usergists,
  usergistviewer
});
