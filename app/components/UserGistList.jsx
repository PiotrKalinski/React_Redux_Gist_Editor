import React from 'react';
import Loading from './Loading';
import Gist from './Gist';

export default ({ gists, fetching, selectedId, onUserGistClick }) => {
    if ( fetching ) {
        <div className = 'user-gist-list'>
         <Loading />
        </div>;
    };
  return (
    <div className='user-gists-list'>
        {gists.map(gist => {
            return <Gist
            key={gist.id}
            gist={gist}
            selected={gist.id === selectedId}
            onClick={onUserGistClick}/>;
        })}
    </div>
  );
};
