import React, { useCallback, useRef } from 'react';
import './SignUp.css';
import { FiMail, FiUser, FiLock, FiArrowDownLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const formFields = [
  {
    id: 'name',
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
  const formRef = useRef(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No minimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'sucess',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no GoBarber!',
        });
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history]
  );

  return (
    <div className="signup-container">
      <div className="signup-background" />
      <div className="signup-content">
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

          <Button>Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiArrowDownLeft />
          Voltar para login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
