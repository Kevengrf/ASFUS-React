import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import apiService from '../../api/apiService';
import useAuth from '../../hooks/useAuth';
import styles from './AppointmentScheduler.module.css';

const AppointmentScheduler = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const fetchAppointments = async () => {
    try {
      const response = await apiService.get('/events'); // Using events API for appointments
      // Filter appointments relevant to the user and selected date
      const userAppointments = response.data.filter(event => 
        new Date(event.date).toDateString() === selectedDate.toDateString()
      );
      setAppointments(userAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowForm(false);
    setCurrentAppointment(null);
    setAppointmentName('');
    setAppointmentTime('');
  };

  const handleAddAppointmentClick = () => {
    setShowForm(true);
    setCurrentAppointment(null);
    setAppointmentName('');
    setAppointmentTime('');
  };

  const handleEditAppointmentClick = (appointment) => {
    setShowForm(true);
    setCurrentAppointment(appointment);
    setAppointmentName(appointment.name);
    // Extract time from ISO string for input type="time"
    setAppointmentTime(new Date(appointment.date).toTimeString().slice(0, 5));
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      try {
        await apiService.delete(`/events/${id}`);
        fetchAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullDateTime = new Date(selectedDate);
    const [hours, minutes] = appointmentTime.split(':');
    fullDateTime.setHours(hours, minutes, 0, 0);

    const appointmentData = {
      name: appointmentName,
      date: fullDateTime.toISOString(),
      location: 'Espaço ASFUS', // Pre-filled location
      description: `Agendamento de visita para ${user?.nome || 'Associado'}` // Dynamic description
    };

    try {
      if (currentAppointment) {
        await apiService.put(`/events/${currentAppointment.id}`, appointmentData);
      } else {
        await apiService.post('/events', appointmentData);
      }
      setShowForm(false);
      fetchAppointments();
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <div className={styles.schedulerContainer}>
      <div className={styles.calendarContainer}>
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      <div className={styles.appointmentsList}>
        <h2>Agendamentos para {selectedDate.toLocaleDateString()}</h2>
        {appointments.length === 0 ? (
          <p>Nenhum agendamento para esta data.</p>
        ) : (
          <ul>
            {appointments.map(app => (
              <li key={app.id} className={styles.appointmentItem}>
                <span>{new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {app.name}</span>
                <div className={styles.appointmentActions}>
                  <button onClick={() => handleEditAppointmentClick(app)} className={styles.editButton}>Editar</button>
                  <button onClick={() => handleDeleteAppointment(app.id)} className={styles.deleteButton}>Cancelar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleAddAppointmentClick} className={styles.addButton}>Agendar Novo Horário</button>
      </div>

      {showForm && (
        <div className={styles.appointmentForm}>
          <h3>{currentAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Propósito da Visita:
              <input
                type="text"
                value={appointmentName}
                onChange={(e) => setAppointmentName(e.target.value)}
                required
              />
            </label>
            <label>
              Hora:
              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
              />
            </label>
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>Salvar</button>
              <button type="button" onClick={() => setShowForm(false)} className={styles.cancelButton}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AppointmentScheduler;
