import React from 'react';

export default ({ description, editing, onChange }) => {
  return (
    <div className='description'>
      <p className='title'>Descriptionss:</p>
      <textarea
        value={description}
        onChange={onChange}
        readOnly={!editing}
      />
    </div>
  );
};

