import React from 'react';
import { getLocalDate } from '../utils/date';

export default (props) => {
  const { gist } = props;
  const dateCreated = getLocalDate(gist.created_at);
  const dateUpdated = getLocalDate(gist.updated_at);

  return (
    <div className='header'>
      <div className='info'>
        <span className='date'>Created: {dateCreated}, </span>
        <span className='date'>Updated: {dateUpdated}</span>
      </div>
    </div>
  );
};
