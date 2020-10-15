import React, { useState, useCallback, useEffect, useMemo } from 'react';
import './Dashboard.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState([]);
  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day, modifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const handleMonthChange = useCallback((month) => {
    setCurrentMonth(month);
  }, []);

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

      <main className="content-dashboard">
        <div className="schedule-dashboard">
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 6</span>
            <span>Segunda-Feira</span>
          </p>
          <div className="next-appointment-dashboard">
            <strong>Atendimento a seguir</strong>
            <div>
              <img src={user.avatar_url} alt="Rafael Misato" />

              <strong>Rafael Misato</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </div>

          <section>
            <strong>Manhã</strong>
            <div className="appointment-section">
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img src={user.avatar_url} alt={user.name} />
                <strong>{user.name}</strong>
              </div>
            </div>
            <div className="appointment-section">
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img src={user.avatar_url} alt={user.name} />
                <strong>{user.name}</strong>
              </div>
            </div>
          </section>

          <section>
            <strong>Tarde</strong>
            <div className="appointment-section">
              <span>
                <FiClock />
                14:00
              </span>
              <div>
                <img src={user.avatar_url} alt={user.name} />
                <strong>{user.name}</strong>
              </div>
            </div>
          </section>
        </div>
        <aside className="calendar-dashboard">
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </aside>
      </main>
    </div>
  );
};

export default Dashboard;
