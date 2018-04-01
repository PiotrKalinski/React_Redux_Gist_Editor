import React from 'react';
import classNames from 'classnames';
import { getVerbalDate } from '../utils/date';
import { getTitle } from '../utils/gistParser';

export default ({ gist, selected, onClick }) => {
  const dateCreated = getVerbalDate(gist.created_at);
  const starred = (gist.starred ? '★'  : null);

  return (
    <div
      className={classNames('gist-item', { 'selected': selected })}
      onClick={() => { onClick(gist.id); }} >
      <div className='meta'>
        <h4>{getTitle(gist)} {starred}</h4>
        <span className='date'>Created: {dateCreated}</span>
      </div>
      <div className='description'>{gist.description}</div>
    </div>
  );
};
