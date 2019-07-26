import React from 'react';
import PropTypes from 'prop-types';

function Radiobutton({ id, text }) {
  return (
    <div className="radio-button">
      <input
        type="radio"
        name={`radio-button-${id}`}
        id={id} />
      <label htmlFor={id}>{text}</label>
    </div>
  );
}

Radiobutton.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Radiobutton;