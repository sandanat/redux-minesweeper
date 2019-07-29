import React from 'react';
import PropTypes from 'prop-types';

function Toggle({
  id,
  text,
  title,
  value,
  onClickHandler
}) {
  let toggleId = `toggle-${id}`;
  let labelId = `label-${id}`;
  let switchId = `switch-${id}`;

  const onChangeCheckbox = event => onClickHandler(event.target.checked);

  return (
    <div className="toggle-checkbox">
      <input
        id={toggleId}
        type="checkbox"
        checked={value}
        onChange={onChangeCheckbox}
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
  hint: PropTypes.string,
  value: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired
};

export default Toggle;