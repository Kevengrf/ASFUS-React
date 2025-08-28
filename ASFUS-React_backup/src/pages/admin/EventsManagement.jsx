// src/pages/admin/EventsManagement.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import Modal from '../../components/Modal/Modal';
import styles from '../../pages/AdminDashboardPage/AdminDashboardPage.module.css';

const EventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenModal = (event = null) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingEvent) {
        await apiService.put(`/events/${editingEvent.id}`, formData);
      } else {
        await apiService.post('/events', formData);
      }
      fetchEvents();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      alert("Falha ao salvar evento.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este evento?")) {
      try {
        await apiService.delete(`/events/${id}`);
        fetchEvents();
      } catch (error) {
        console.error("Erro ao excluir evento:", error);
        alert("Falha ao excluir evento.");
      }
    }
  };

  if (loading) return <p>Carregando eventos...</p>;

  return (
    <div>
      <h2>Gerenciamento de Eventos</h2>
      <button onClick={() => handleOpenModal()} className={styles.addButton}>Adicionar Novo Evento</button>

      <div className={styles.tableWrapper}> {/* Adicionado para rolagem horizontal em mobile */}
        <table className={styles.managementTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data</th>
              <th>Local</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td data-label="Nome">{event.name}</td>
                <td data-label="Data">{new Date(event.date).toLocaleString()}</td>
                <td data-label="Local">{event.location}</td>
                <td data-label="Ações" className={styles.actions}>
                  <button onClick={() => handleOpenModal(event)} className={styles.editButton}>Editar</button>
                  <button onClick={() => handleDelete(event.id)} className={styles.deleteButton}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingEvent ? 'Editar Evento' : 'Adicionar Evento'}>
        <EventForm onSubmit={handleFormSubmit} initialData={editingEvent} />
      </Modal>
    </div>
  );
};

// Formulário interno
const EventForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [date, setDate] = useState(initialData?.date ? initialData.date.substring(0, 16) : '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [description, setDescription] = useState(initialData?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, date, location, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome do Evento" required />
      <label>Data</label>
      <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
      <label>Local</label>
      <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Local" required />
      <label>Descrição</label>
      <textarea rows="5" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default EventsManagement;