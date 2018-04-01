import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';
import { getAllGists, changeFilter, searchGists, changeSearchValue } from '../actions/gists';
import { selectGist, createNewGist, userSelectGist  } from '../actions/gist';
import { logOut } from '../actions/auth';
import * as gistStates from '../consts/gist-states';

import UserSearch from '../components/UserSearch';
import Loading from '../components/Loading';
import Root from '../components/Root';
import SelectedGist from './SelectedGist';
import SelectedUserGist from './SelectedUserGist';
import MyGistList from '../components/MyGistList';
import NewGist from './NewGist';
import UserGistList from '../components/UserGistList';


const getFiltertedGists = ({ data, filter }) => {
  switch (filter) {
    case 'starred':
      return data.filter(gists => gists.starred);
    default:
      return data;
  }
};


class App extends React.Component {
  componentWillMount() {
    const { token } = this.props.auth;
    autoBind(this);
    this.props.getAllGists(token);
  }

  getComponentByState() {
    const { fetching } = this.props.gist;

    if (fetching) {
      return <Loading />;
    }

    const { state } = this.props.gist;
    switch (state) {
      case gistStates.NO_GIST:
        return <h1>Click gist to load</h1>;
      case gistStates.SELECTED_GIST:
        return <SelectedGist />;
      case gistStates.NEW_GIST:
        return <NewGist />;
      case gistStates.SELECTED_USER_GIST:
      return <SelectedUserGist/>;
    }
  }


  loadSearchListByState() {
    const { state } = this.props.usergists;
    const { token } = this.props.auth;
    const { usergists, userSelectGist  } = this.props;
    switch (state) {
      case gistStates.NO_GIST:
      return null;
      default:
      return <UserGistList
          fetching={usergists.fetching}
          selectedId={usergists.selectedId}
          gists={usergists.data}
          onUserGistClick={userSelectGist.bind(null, token)}
        />;
    };
  };

  handleSearchChange(ev){
    const { changeSearchValue } = this.props;
    changeSearchValue(ev.target.value);
    console.log(ev.target.value);
  }


  onSearchClick(){
    const { token } = this.props.auth;
    const { searchGists } = this.props;
    const { search } = this.props.usergists;
    searchGists(token, search);
  }


render() {
    const { token, user } = this.props.auth;
    const { gists, selectGist, createNewGist, logOut, changeFilter } = this.props;
    return (
      <div className='app'>
        <Root
          user={user}
          onCreateClick={createNewGist}
          onLogoutClick={logOut}
          onFilterChangeClick={changeFilter}
          filter={gists.filter}
          onChange={this.handleSearchChange}
          onSearchClick={this.onSearchClick}
        />
        <MyGistList
          gists={getFiltertedGists(gists)}
          fetching={gists.fetching}
          selectedId={gists.selectedId}
          onGistClick={selectGist.bind(null, token)}
         />
        {this.getComponentByState()}
        {this.loadSearchListByState()}
      </div>
    );
  }
}

export default connect(
  ({ auth, gists, gist, editor, usergists }) => ({ auth, gists, gist, editor, usergists }),
  (dispatch) => (
  bindActionCreators({ changeFilter, logOut, getAllGists, selectGist, userSelectGist, createNewGist, searchGists, changeSearchValue }, dispatch)
  )
)(App);
