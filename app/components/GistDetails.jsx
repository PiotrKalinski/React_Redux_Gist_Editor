import React from 'react';
import { getLocalDate } from '../utils/date';

const EditButtons = ({ gist, onEditClick, onRemoveClick }) => {
  return (
    <div>
      <button
        className='edit'
        onClick={() => onEditClick(gist.id)}
      >  Edit
      </button>
      <button
        className='remove'
        onClick={() => onRemoveClick(gist.id) }
      > Remove
      </button>
    </div>
  );
};

const SaveButton = ({ onSaveClick, onDiscardClick }) => (
  <div>
    <button
      className='save'
      onClick={() => onSaveClick()}
    > Save
    </button>
    <button
      className='discard'
      onClick={() => onDiscardClick()}
    > Discard
    </button>
  </div>
);


export default (props) => {
  const { gist, editing } = props;
  const dateCreated = getLocalDate(gist.created_at);
  const dateUpdated = getLocalDate(gist.updated_at);

  const editControls = (editing ?
    <SaveButton { ...props } /> :
    <EditButtons { ...props } /> );

  return (
    <div className='header'>
      <div className='info'>
        <span className='date'>Created: {dateCreated}, </span>
        <span className='date'>Updated: {dateUpdated}</span>
      </div>
      {editControls}
    </div>
  );
};
