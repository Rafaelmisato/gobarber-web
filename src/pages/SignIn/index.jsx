import React from 'react';
import './style.css';
import { FiLogIn, FiLock, FiMail, FiUser } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const formFields = [
  {
    id: 'nome',
    type: 'text',
    placeholder: 'nome',
    icon: FiUser,
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Senha',
    icon: FiLock,
  },
];

const SignUp = () => {
  const [data, setData] = useState({ nome: '', password: '' });

  function handleChange({ target }) {
    const { id, value } = target;
    setData({ ...data, [id]: value });
    console.log(data);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

const SignIn = () => {
  return (
    <div className="container">
      <div className="content">
        <img src={logoImg} alt="Gobarber" />

        <form>
          <h1>Faça seu logon</h1>

          {formFields.map(({ id, type, placeholder, icon }) => (
            <Input
              key={id}
              type={type}
              icon={icon}
              placeholder={placeholder}
              id={id}
              value={data[id]}
              onChange={handleChange}
            />
          ))}

          <Button type="button" onSubmit={handleSubmit}>Enviar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </form>

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
