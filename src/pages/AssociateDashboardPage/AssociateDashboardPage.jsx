import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import styles from './AssociateDashboardPage.module.css';

const AssociateDashboardPage = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  return (
    <div className={styles.dashboardContainer}>
      <h1>Bem-vindo, {user?.nome || 'Associado'}!</h1>

      <section className={styles.section}>
        <h2>Meus Agendamentos</h2>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </section>
    </div>
  );
};

export default AssociateDashboardPage;
