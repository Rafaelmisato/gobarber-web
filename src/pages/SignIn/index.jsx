import React from 'react';
import './style.css';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

const SignIn = () => {
  return (
    <div className="container">
      <div className="content">
        <img src={logoImg} alt="Gobarber" />

        <form>
          <h1>Faça seu logon</h1>

          <input placeholder="E-mail" />

          <input type="password" placeholder="Senha" />

          <button type="submit">Entrar</button>

          <a href="forgot">Esqueci minha senha</a>
        </form>

        <a href="teste">
          <FiLogIn />
          Criar conta
        </a>
      </div>
      <div className="background" />
    </div>
  );
};

export default SignIn;
