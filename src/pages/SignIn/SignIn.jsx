import React, { useCallback, useRef } from 'react';
import './SignIn.css';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FiLogIn, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const formFields = [
  {
    id: 'email',
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

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail Obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha Inválida'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        addToast({
          type: 'success',
          title: 'Login efetuado',
          description: 'Seu login foi feito com sucesso!',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, history]
  );

  return (
    <div className="singin-container">
      <div className="singin-content">
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
            />
          ))}

          <Button>Entrar</Button>
          <a href="teste">Esqueci minha senha</a>
        </Form>

        <Link to="/signup">
          <FiLogIn />
          Criar conta
        </Link>
      </div>
      <div className="singin-background" />
    </div>
  );
};

export default SignIn;
