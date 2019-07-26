import React from 'react';
import PropTypes from 'prop-types';

function Toggle({
  id,
  text,
  title
}) {
  let toggleId = `toggle-${id}`;
  let labelId = `label-${id}`;
  let switchId = `switch-${id}`;
  
  return (
    <div className="toggle-checkbox">
      <input
        id={toggleId}
        type="checkbox"
      />
      <label
        id={labelId}
        htmlFor={toggleId}
        title={title}
      >
        <div id={switchId}></div>
        <span>{text}</span>
      </label>
    </div>
  );
}

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  hint: PropTypes.string
};

export default Toggle;