import React from 'react';

export default () => {
    const url = '/auth/github';

    return (
    <div>
      <h3>Welcome to gist exploler</h3>
      <a href={url}>Log into app</a>
    </div>
    );
};
