import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import useAuth from '../../hooks/useAuth';
import styles from './AssociateDashboardPage.module.css';
import AppointmentScheduler from '../../components/AppointmentScheduler/AppointmentScheduler';

const AssociateDashboardPage = () => {
  const { user } = useAuth();
  
  
  

  

  

  return (
    <div className={styles.dashboardContainer}>
      <h1>Bem-vindo, {user?.nome || 'Associado'}!</h1>

      <section className={styles.section}>
        <h2>Meus Agendamentos</h2>
        <AppointmentScheduler />
      </section>

      
    </div>
  );
};

export default AssociateDashboardPage;
