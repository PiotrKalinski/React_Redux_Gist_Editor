import React from 'react';

export default ({ editing, file, onChange }) => {
  return (
    <input
      name="filename"
      type="text"
      readOnly={!editing}
      onChange={onChange.bind(null, 'filename')}
      defaultValue={file.filename} />
  );
};
