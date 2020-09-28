import React, { useState } from 'react';
import './SignUp.css';
import { FiMail, FiUser, FiLock, FiArrowDownLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const formFields = [
  {
    id: 'nome',
    type: 'text',
    placeholder: 'Nome',
    icon: FiUser,
  },
  {
    id: 'email',
    type: 'email',
    placeholder: 'E-mail',
    icon: FiMail,
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Senha',
    icon: FiLock,
  },
];

const SignUp = () => {
  const [data, setData] = useState({ nome: '', email: '', password: '' });

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
      <div className="background" />
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
              value={data[id]}
              onChange={handleChange}
            />
          ))}

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
