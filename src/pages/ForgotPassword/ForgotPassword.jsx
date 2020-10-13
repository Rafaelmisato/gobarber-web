import React, { useCallback, useRef } from 'react';
import './ForgotPassword.css';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FiMail, FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const formFields = [
  {
    id: 'email',
    type: 'email',
    placeholder: 'E-mail',
    icon: FiMail,
  },
];

const ForgotPassword = () => {
  const formRef = useRef(null);

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
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // recuperacao de senha

        addToast({
          type: 'success',
          title: 'Verifique sua caixa de e-mail',
          description: 'E-mail enviado com sucesso',
        });

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao fazer a recuperação de senha, tente novamente',
        });
      }
    },
    [addToast, history]
  );

  return (
    <div className="forgot-container">
      <div className="forgot-content">
        <img src={logoImg} alt="Gobarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar senha</h1>

          {formFields.map(({ id, type, placeholder, icon }) => (
            <Input
              name={id}
              key={id}
              type={type}
              icon={icon}
              placeholder={placeholder}
            />
          ))}

          <Button>Recuperar</Button>
        </Form>

        <Link to="/signin">
          <FiLogIn />
          Voltar ao Login
        </Link>
      </div>
      <div className="forgot-background" />
    </div>
  );
};

export default ForgotPassword;
