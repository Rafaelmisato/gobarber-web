import React, { useCallback, useRef, useContext } from 'react';
import './SignIn.css';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FiLogIn, FiLock } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';

import { AuthContext } from '../../context/AuthContext';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const formFields = [
  {
    id: 'name',
    type: 'email',
    placeholder: 'E-mail',
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

  const { user, signIn } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .required('E-mail Obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha Inválida'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current.setErrors(errors);
      }
    },
    [signIn]
  );

  return (
    <div className="container">
      <div className="content">
        <img src={logoImg} alt="Gobarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>

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

          <Button type="submit">Entrar</Button>
          <a href="teste">Esqueci minha senha</a>
        </Form>

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
