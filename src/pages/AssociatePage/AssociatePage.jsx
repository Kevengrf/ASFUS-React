// src/pages/AssociatePage/AssociatePage.jsx
import React, { useState } from 'react';
import styles from './AssociatePage.module.css';

const AssociatePage = () => {
  const [associate] = useState({
    nome: 'Carlos Associado',
    email: 'carlos@example.com',
    cpf: '123.456.789-00',
    telefone: '(31) 99999-8888'
  });
  
  const [appointments, setAppointments] = useState([
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const handleAddAppointment = () => {
    // Logic to add a new appointment
    // For now, just closes the modal
    setIsModalOpen(false);
  };

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
            <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>+ Novo Agendamento</button>
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
                    <button className={styles.actionButton}>Editar</button>
                    <button className={styles.cancelButton}>Cancelar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal para adicionar agendamento */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Novo Agendamento</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.formGroup}>
              <label>Data do Agendamento</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
            <div className={styles.modalActions}>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
              <button type="button" onClick={handleAddAppointment} className={styles.submitButton}>
                Agendar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssociatePage;
