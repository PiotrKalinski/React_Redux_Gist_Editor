import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeGist , updateGist } from '../actions/gist';
import { searchGists } from '../actions/gists';
import { turnEditOn , discardChanges } from '../actions/editor';

import Editor from './Editor';
import GistDetails from '../components/GistDetails';

class SelectedGist extends React.Component {

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
    const { gist, token, removeGist, turnEditOn, discardChanges } = this.props;
    const orginalGist = gist.orginal;
    const { editing } = this.props.editor;
    return (
      <div className='selected-gist'>
        <GistDetails
          gist={gist.data}
          editing={editing}
          onRemoveClick={removeGist.bind(null, token)}
          onEditClick={turnEditOn}
          onSaveClick={this.onSaveClick}
          onDiscardClick={discardChanges.bind(null, orginalGist)}
        />
        <Editor />
      </div>
    );
  };
};

export default connect(
  ({ auth, gist, editor }) => ({ token: auth.token, gist, editor }),
  (dispatch) => (
    bindActionCreators({
      removeGist,
      updateGist,
      turnEditOn,
      discardChanges
    }, dispatch)
  )
)(SelectedGist);
