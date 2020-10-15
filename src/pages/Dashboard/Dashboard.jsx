import React from 'react';
import './Dashboard.css';

import { FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard = () => {
  const { signOut, user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="header-dashboard">
        <div className="header-content-dashboard">
          <img src={logoImg} alt="GoBarber" />

          <div className="profile-img-dashboard">
            <img src={user.avatar_url} alt={user.name} />
            <div className="profile-content-dashboard">
              <span>Bom dia,</span>
              <strong>{user.name}</strong>
            </div>
          </div>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
