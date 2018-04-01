import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDescription, updateFiles } from '../actions/editor';
import Description from './Editor/Description';
import Files from './Editor/Files';

class Viewer extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleFileChange(index, type, ev) {
    const { data } = this.props.usergistviewer;
    const fileName = Object.keys(data.files)[index];
    let file = data.files[fileName];
    file[type] = (ev.target ? ev.target.value : ev);
    this.props.updateFiles({ [fileName]: file });
  };


  handleSearchUser() {
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getProperFileComponentss() {
    const { data } = this.props.usergistviewer;
    return Object.values(data.files)
      .reduce((memo, file, index) => {
        if (file !== null) {
          return memo.concat((
            <Files
              key={index}
              file={file}
              onChange={this.handleFileChange.bind(null, index)}
            />
          ));
        }
        return memo;
      }, []);
  }

  render() {
    const { data, editing } = this.props.usergistviewer;
    return (
      <div className='gist-files'>
        <Description
          description={data.description}
          editing={editing}
        />
        {this.getProperFileComponentss()}
      </div>
    );
  }
}

export default connect(
  ({ usergistviewer }) => ({ usergistviewer }),
  (dispatch) => (
    bindActionCreators({ updateDescription, updateFiles }, dispatch)
  )
)(Viewer);
