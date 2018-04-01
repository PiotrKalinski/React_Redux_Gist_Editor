import React from 'react';
import autoBind from 'react-autobind';
import Editor from './Editor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveNewGist } from '../actions/gist';
class NewGist extends React.Component {
    constructor(props){
        super(props);
        autoBind(this);
    }

    onSaveClick(){
        const { token, saveNewGist } = this.props;
        const { data } = this.props.editor;
        saveNewGist(token, data);
    }


    render() {
        console.log(this.props);
        return (
          <div className='new-gist'>
            <div className='header'>
              <h4>Create new gist</h4>
              <button
                onClick={this.onSaveClick} >
                Save
              </button>
            </div>
            <Editor />
          </div>
        );
      }
    };

export default connect(
  ({ auth, editor }) => ({ token: auth.token, editor }),
  (dispatch) => (
    bindActionCreators({
      saveNewGist
    }, dispatch)
  )
)(NewGist);
