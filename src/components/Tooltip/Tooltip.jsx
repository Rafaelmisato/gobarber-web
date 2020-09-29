import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import './Tooltip.css';

const Tooltip = ({ title, children }) => {
  return (
    <div className={title ? 'errorColor' : 'tooltip-container'}>
      <FiAlertCircle color="#c53030" size={20} />
      {children}
      <span>{title}</span>
    </div>
  );
};

export default Tooltip;
