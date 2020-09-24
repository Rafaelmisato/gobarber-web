import React from 'react';
import './style.css';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const SignIn = () => {
  return (
    <div className="container">
      <div className="content">
        <img src={logoImg} alt="Gobarber" />

        <form>
          <h1>Faça seu logon</h1>

          <Input icon={FiMail} type="text" placeholder="Nome" />
          <Input icon={FiLock} type="password" placeholder="Senha" />

          <Button type="button">Enviar</Button>

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
