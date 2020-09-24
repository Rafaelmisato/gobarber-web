import React from 'react';
import './style.css';
import { FiMail, FiUser, FiLock, FiArrowDownLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const SignUp = () => {
  return (
    <div className="container">
      <div className="background" />
      <div className="content">
        <img src={logoImg} alt="Gobarber" />

        <form>
          <h1>Faça seu cadastro</h1>

          <Input icon={FiUser} placeholder="Nome" />
          <Input icon={FiMail} placeholder="E-mail" />
          <Input icon={FiLock} placeholder="Senha" type="password" />

          <Button type="submit">Cadastrar</Button>
        </form>

        <a href="teste">
          <FiArrowDownLeft />
          Voltar para logon
        </a>
      </div>
    </div>
  );
};

export default SignUp;
