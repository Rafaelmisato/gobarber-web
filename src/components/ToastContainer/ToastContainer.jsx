import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast/Toast';

import './ToastContainer.css';

const ToastContainer = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    }
  );

  return (
    <div className="toast-container">
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </div>
  );
};

export default ToastContainer;
