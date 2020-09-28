import React, { useCallback, useRef } from 'react';
import './SignUp.css';
import { FiMail, FiUser, FiLock, FiArrowDownLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

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

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current.setErrors({});

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
      const errors = getValidationErrors(err);
      formRef.current.setErrors(errors);
    }
  }, []);

  return (
    <div className="container">
      <div className="background" />
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

        <a href="teste">
          <FiArrowDownLeft />
          Voltar para logon
        </a>
      </div>
    </div>
  );
};

export default SignUp;
