import React from 'react';
import './Button.css';

const Button = ({ children, loading }) => (
  <button className="button" type="submit">
    {loading ? 'Carregando...' : children}
  </button>
);

export default Button;
