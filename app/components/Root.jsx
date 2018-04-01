import React from 'react';
import classNames from 'classnames';
export default ({ user, onCreateClick, onLogoutClick, onFilterChangeClick, filter, username, editing, onChange, onSearchClick }) => {
    const name = user.name || user.login;
    const avatar = {
        backgroundImage: 'url(' + user.avatar_url + ')'
    };

    return (
        <div className='root'>
        <div className='header'>
        <div className='avatar' style={avatar}>
                <div className='user'>
        <a href={user.url}>{name}</a></div>
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
              <button
        className='log-out'
        onClick={onLogoutClick}>
        Log out
      </button>
            <button
        className='create-new-gist'
        onClick={onCreateClick}>
        New Gist
      </button>
            <div className='filter'>
        <button
          className={classNames({ 'selected': filter === 'all' })}
          onClick={onFilterChangeClick.bind(null, 'all')}>
          All
        </button>
        <button
          className={classNames({ 'selected': filter === 'starred' })}
          onClick={onFilterChangeClick.bind(null, 'starred')}>
          Starred
        </button>
      </div>
        </div>
        </div>
        </div>
    );
};
