import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import Viewer from './Viewer';
import UserGistDetails from '../components/UserGistDetails';

class SelectedUserGist extends React.Component {

  constructor(props){
    super(props);
    autoBind(this);
  }
  onSaveClick() {
    const { token, updateGist } = this.props;
    const { data } = this.props.editor;
    updateGist(token, data);
    searchGists(data.description);
  }
  render() {
    const { gist } = this.props;
    return (
      <div className='selected-gist'>
        <UserGistDetails
          gist={gist.viewer}
        />
        <Viewer />
      </div>
    );
  };
};

export default connect(
  ({ auth, gist, editor }) => ({ token: auth.token, gist, editor }))(SelectedUserGist);
