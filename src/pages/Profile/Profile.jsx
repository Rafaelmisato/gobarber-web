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
    id: 'password',
    type: 'password',
    placeholder: 'Nova senha',
    icon: FiLock,
  },
  {
    id: 'password_confirmation',
    type: 'password',
    placeholder: 'Confirmar senha',
    icon: FiLock,
  },
];

const Profile = () => {
  const formRef = useRef(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo Obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo Obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação Incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password, // eslint-disable-line
          password,
          password_confirmation, // eslint-disable-line
        } = data;

        const formData = {
          name,
          email,
          ...(old_password // eslint-disable-line
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'sucess',
          title: 'Perfil atualizado!',
          description: 'Atualize a página para ver as alterações',
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
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar perfil, tente novamente',
        });
      }
    },
    [addToast, history, updateUser]
  );

  const handleAvatarChange = useCallback(
    (event) => {
      if (event.target.files) {
        const data = new FormData();

        data.append('avatar', event.target.files[0]);

        api.patch('/users/avatar', data).then((response) => {
          updateUser(response.data);

          addToast({
            type: 'sucess',
            title: 'Avatar atualizado',
            description: 'Atualize a página, para ver as alterações',
          });
        });
      }
    },
    [addToast, updateUser]
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

            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
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
