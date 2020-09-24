import React from 'react';
import './Input.css';

const Input = (props) => {
  const Icon = props.icon; // eslint-disable-line
  return (
    <div className="input-container">
      {Icon && <Icon size={20} />}
      <input {...props} />
    </div>
  );
};
export default Input;
