import React, { useState, useRef, useCallback } from 'react';
import './Input.css';

const Input = ({ icon, ...props }) => {
  const Icon = icon;
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <div className={isFocused ? 'selected' : 'input-container'}>
      {Icon && <Icon size={20} className={isFilled ? 'filled' : ''} />}
      <input
        {...props}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
      />
    </div>
  );
};
export default Input;
