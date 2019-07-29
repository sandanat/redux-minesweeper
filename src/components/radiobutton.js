import React from 'react';
import PropTypes from 'prop-types';

function Radiobutton({ id, text, name, checkedId, onChangeHandler }) {
  return (
    <div className="radio-button">
      <input
        type="radio"
        name={name}
        value={id}
        id={id}
        onChange={() => onChangeHandler(id)}
        checked={checkedId === id}
      />
      <label htmlFor={id}>{text}</label>
    </div>
  );
}

Radiobutton.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checkedId: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired
};

export default Radiobutton;