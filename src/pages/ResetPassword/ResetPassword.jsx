import React, { useCallback, useRef } from 'react';
import '../ResetPassword/ResetPassword.css';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import api from '../../services/api';

const formFields = [
  {
    id: 'password',
    type: 'password',
    placeholder: 'Nova senha',
    icon: FiLock,
  },
  {
    id: 'password_confirmation',
    type: 'password',
    placeholder: 'Confirme sua nova senha',
    icon: FiLock,
  },
];

const ResetPassword = () => {
  const formRef = useRef(null);

  const { addToast } = useToast();
  const history = useHistory();

  const location = useLocation();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha Obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas não são iguais'
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data; // eslint-disable-line
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Login efetuado',
          description: 'Seu login foi feito com sucesso!',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente',
        });
      }
    },
    [addToast, history, location.search]
  );

  return (
    <div className="reset-password-container">
      <div className="reset-password-content">
        <img src={logoImg} alt="Gobarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Resetar Senha</h1>

          {formFields.map(({ id, type, placeholder, icon }) => (
            <Input
              name={id}
              key={id}
              type={type}
              icon={icon}
              placeholder={placeholder}
            />
          ))}

          <Button>Alterar senha</Button>
        </Form>
      </div>
      <div className="singin-background" />
    </div>
  );
};

export default ResetPassword;
