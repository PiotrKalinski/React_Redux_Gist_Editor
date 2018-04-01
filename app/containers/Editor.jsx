import React from 'react';
import autoBind from 'react-autobind';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDescription, updateFiles } from '../actions/editor';
import Description from './Editor/Description';
import Files from './Editor/Files';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleDescriptionChange(ev) {
    const { updateDescription } = this.props;
    updateDescription(ev.target.value);
  }

  handleFileChange(index, type, ev) {
    const { data } = this.props.editor;
    const fileName = Object.keys(data.files)[index];
    let file = data.files[fileName];
    file[type] = (ev.target ? ev.target.value : ev);
    this.props.updateFiles({ [fileName]: file });
  };

  handleAddFile() {
    const fileName = uuid.v4();
    const newFile = {
      filename: 'new-file',
      content: ''
    };
    this.props.updateFiles({ [fileName]: newFile });
  };

  handleFileDelete(index) {
    const { data } = this.props.editor;
    const fileName = Object.keys(data.files)[index];
    this.props.updateFiles({ [fileName]: null });
  }

  getProperFileComponents() {
    const { data, editing } = this.props.editor;
        return Object.values(data.files)
      .reduce((memo, file, index) => {
        if (file !== null) {
          return memo.concat((
            <Files
              key={index}
              editing={editing}
              file={file}
              onFileDeleteClick={this.handleFileDelete.bind(null, index)}
              onChange={this.handleFileChange.bind(null, index)}
            />
          ));
        }
        return memo;
      }, []);
  }

  render() {
    const { data, editing } = this.props.editor;
    return (
      <div className='gist-files'>
        <Description
          description={data.description}
          editing={editing}
          onChange={this.handleDescriptionChange}
        />
        {this.getProperFileComponents()}
        <button
          onClick={this.handleAddFile}>
          Add File
        </button>
      </div>
    );
  }
}

export default connect(
  ({ editor }) => ({ editor }),
  (dispatch) => (
    bindActionCreators({ updateDescription, updateFiles }, dispatch)
  )
)(Editor);
