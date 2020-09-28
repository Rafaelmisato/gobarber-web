import React, { useCallback } from 'react';
import './SignIn.css';
import * as Yup from 'yup';

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
  const handleSubmit = useCallback(async (data) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Dígite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className="container">
      <div className="content">
        <img src={logoImg} alt="Gobarber" />
        <form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          {formFields.map(({ id, type, placeholder, icon }) => (
            <Input
              name={id}
              key={id}
              type={type}
              icon={icon}
              placeholder={placeholder}
              id={id}
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
