import React from 'react';


const DeleteButton = ({ onClick }) => (
  <button
    onClick={onClick}
  > Delete File
  </button>
);

export default ({ onFileDeleteClick, ...props }) => {
  return (
    <div className='file-item'>
    </div>
  );
};
