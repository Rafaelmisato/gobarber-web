import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import './ToastContainer.css';

const ToastContainer = () => {
  return (
    <div className="toast-container">
      <div className="toast">
        <FiAlertCircle size={20} />

        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login na aplicação</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </div>

      <div className="sucess">
        <FiAlertCircle size={20} />

        <div>
          <strong>Aconteceu um erro</strong>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </div>

      <div className="toast-error" type="error">
        <FiAlertCircle size={20} />

        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login na aplicação</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </div>
    </div>
  );
};

export default ToastContainer;
