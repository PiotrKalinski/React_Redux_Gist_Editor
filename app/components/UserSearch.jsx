import React from 'react';

export default ({ username, editing, onChange, onSearchClick }) => {
  return (
    <div className='user-search'>
      <input
        type="text"
        value={username}
        onChange={onChange}
        readOnly={editing}
      />
      <button
      className='save'
      onClick={() => onSearchClick()}
    > Search
    </button>
    </div>
  );
};
