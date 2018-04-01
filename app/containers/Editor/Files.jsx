import React from 'react';
import FilesName from './FileName';
import GistEditor from './GistEditor';

const DeleteButton = ({ onClick }) => (
  <button
    onClick={onClick}
  > Delete File
  </button>
);

export default ({ onFileDeleteClick, ...props }) => {

  const deleteButton = (props.editing ?
    <DeleteButton
      onClick={onFileDeleteClick}
    /> :
    null );

  return (
    <div className='file-item'>
        <FilesName {...props} />
        <GistEditor {...props} />
        {deleteButton}
    </div>
  );
};
