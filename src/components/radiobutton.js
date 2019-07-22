import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Radiobutton({ id, text, checked }) {
  const radiobuttonRef = useRef(null);

  useEffect(() => {
    radiobuttonRef.current.checked = !!checked;
  });

  return (
    <div className="radio-buttons">
      <input
        ref={radiobuttonRef}
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