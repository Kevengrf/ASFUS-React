// src/pages/AssociatePage/AssociatePage.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './AssociatePage.module.css';

const AssociatePage = () => {
  const [associate] = useState({
    nome: 'Carlos Associado',
    email: 'carlos@example.com',
    cpf: '123.456.789-00',
    telefone: '(31) 99999-8888'
  });
  
  const [appointments] = useState([
    {
      id: 1,
      title: 'Aula de Natação',
      date: '2024-01-15',
      time: '14:00',
      location: 'Piscina ASFUS',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Festa de Aniversário',
      date: '2024-01-20',
      time: '19:00',
      location: 'Salão de Eventos',
      status: 'pending'
    }
  ]);
  

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#28a745';
      case 'pending': return '#ffc107';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className={styles.associateContainer}>
      <div className={styles.header}>
        <h1>Portal do Associado</h1>
        <p>Bem-vindo(a), {associate.nome}!</p>
      </div>

      <div className={styles.contentGrid}>
        {/* Seção de Agendamentos */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>📅 Meus Agendamentos</h2>
            <button className={styles.addButton}>+ Novo Agendamento</button>
          </div>
          
          {appointments.length === 0 ? (
            <div className={styles.emptyState}>
              <span>📅</span>
              <p>Nenhum agendamento encontrado</p>
            </div>
          ) : (
            <div className={styles.appointmentsList}>
              {appointments.map(appointment => (
                <div key={appointment.id} className={styles.appointmentCard}>
                  <div className={styles.appointmentHeader}>
                    <h3>{appointment.title}</h3>
                    <span 
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(appointment.status) }}
                    >
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                  <div className={styles.appointmentDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>📅</span>
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>🕐</span>
                      <span>{appointment.time}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>📍</span>
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                  <div className={styles.appointmentActions}>
                    <input type="date" className={styles.dateInput} />
                    <button className={styles.actionButton}>Salvar</button>
                    <button className={styles.cancelButton}>Cancelar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>📅 Agendar Visita</h2>
          </div>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label>Data da Visita</label>
              <input type="date" />
            </div>
            <button type="submit" className={styles.addButton}>Agendar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssociatePage;