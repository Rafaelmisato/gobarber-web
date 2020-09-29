import React, { useCallback, useRef } from 'react';
import './SignIn.css';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FiLogIn, FiLock } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';

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
  const formRef = useRef(null);

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        login: Yup.string()
          .required('Usuário Obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha Inválida'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current.setErrors(errors);
    }
  }, []);

  return (
    <div className="container">
      <div className="content">
        <img src={logoImg} alt="Gobarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
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
        </Form>

        <a href="teste">Voltar para logon</a>
      </div>
      <div className="background" />
    </div>
  );
};

export default SignIn;
