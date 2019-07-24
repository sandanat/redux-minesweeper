import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function Toggle({
  id,
  text,
  checked,
  updateQuestionMarkAccess,
  title
}) {
  let toggleId = `toggle-${id}`;
  let labelId = `label-${id}`;
  let switchId = `switch-${id}`;
  
  let onChange = event => {
    updateQuestionMarkAccess(event.target.checked);
  };
  
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.checked = !!checked;
  });

  return (
    <div className="toggle-checkbox">
      <input
        id={toggleId}
        type="checkbox"
        ref={inputRef}
        onChange={onChange}
      />
      <label
        id={labelId}
        htmlFor={toggleId}
        title={title}
      >
        <div id={switchId}></div>
      </label>
      <span>{text}</span>
    </div>
  );
}

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  hint: PropTypes.string
};

export default Toggle;