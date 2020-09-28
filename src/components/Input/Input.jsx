import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useField } from '@unform/core';
import './Input.css';

const Input = ({ icon, name, ...props }) => {
  const Icon = icon;
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

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
      {error}
    </div>
  );
};
export default Input;
