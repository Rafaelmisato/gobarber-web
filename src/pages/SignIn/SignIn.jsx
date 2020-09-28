import React, { useState } from 'react';
import './SignIn.css';

import { FiLogIn, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const formFields = [
  {
    id: 'login',
    type: 'text',
    placeholder: 'Login',
    icon: FiLogIn,
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Senha',
    icon: FiLock,
  },
];

const SignIn = () => {
  const [data, setData] = useState({ login: '', password: '' });

  function handleSubmit(event) {
    event.preventDefault();
    console.log({ ...data });
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setData({ ...data, [id]: value });
  }

  return (
    <div className="container">
      <div className="content">
        <img src={logoImg} alt="Gobarber" />
        <form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          {formFields.map(({ id, type, placeholder, icon }) => (
            <Input
              key={id}
              type={type}
              icon={icon}
              placeholder={placeholder}
              id={id}
              value={data.id}
              onChange={handleChange}
            />
          ))}

          <Button type="submit">Cadastrar</Button>
        </form>

        <a href="teste">Voltar para logon</a>
      </div>
      <div className="background" />
    </div>
  );
};

export default SignIn;
