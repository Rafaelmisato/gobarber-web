import React, { useCallback, useRef } from 'react';
import './Profile.css';
import { FiUser, FiLock, FiMail, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

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
    placeholder: 'Email',
    icon: FiMail,
  },
  {
    id: 'old_password',
    type: 'password',
    placeholder: 'Senha atual',
    icon: FiLock,
  },
  {
    id: 'new_password',
    type: 'password',
    placeholder: 'Nova senha',
    icon: FiLock,
  },
  {
    id: 'confirm_password',
    type: 'password',
    placeholder: 'Confirmar senha',
    icon: FiLock,
  },
];

const Profile = () => {
  const formRef = useRef(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user } = useAuth();

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
    <div className="profile-container">
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <div className="profile-content">
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <div className="avatar-input">
            <img src={user.avatar_url} alt={user.name} />
            <button type="button">
              <FiCamera size="20px" />
            </button>
          </div>
          <h1>Meu perfil</h1>

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

          <Button>Confirmar mudanças</Button>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
