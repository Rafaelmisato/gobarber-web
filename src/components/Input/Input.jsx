import React, { useEffect, useRef } from 'react';
import './Input.css';

const Input = ({ icon, ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {}, []);

  const Icon = icon;
  return (
    <div className="input-container">
      {Icon && <Icon size={20} />}
      <Input ref={inputRef} {...props} />
    </div>
  );
};
export default Input;
