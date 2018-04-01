import React from 'react';
import Loading from './Loading';
import Gist from './Gist';

export default ({ gists, fetching, selectedId, onGistClick }) => {
    if ( fetching ) {
        <div className = 'gist-list'>
         <Loading />
        </div>;
    };
  return (
    <div className='gists-list'>
      {gists.map(gist => {
        return <Gist
          key={gist.id}
          gist={gist}
          selected={gist.id === selectedId}
          onClick={onGistClick} />;
      })}
    </div>
  );
};
