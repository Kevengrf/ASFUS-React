// src/pages/admin/AppointmentsManagement.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import * as XLSX from 'xlsx';
import styles from '../../pages/AdminDashboardPage/AdminDashboardPage.module.css';

const AppointmentsManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Assuming an endpoint /agendamentos, this might need to be created in the backend
      const response = await apiService.get('/agendamentos');
      setAppointments(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDownloadXLS = () => {
    const worksheet = XLSX.utils.json_to_sheet(appointments);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agendamentos");
    XLSX.writeFile(workbook, "agendamentos.xlsx");
  };

  if (loading) return <p>Carregando agendamentos...</p>;

  return (
    <div>
      <h2>Gerenciamento de Agendamentos</h2>
      <button onClick={handleDownloadXLS} className={styles.addButton}>Download XLS</button>

      <div className={styles.tableWrapper}>
        <table className={styles.managementTable}>
          <thead>
            <tr>
              <th>Associado</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Local</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td data-label="Associado">{appointment.associateName}</td>
                <td data-label="Data">{new Date(appointment.date).toLocaleDateString()}</td>
                <td data-label="Hora">{appointment.time}</td>
                <td data-label="Local">{appointment.location}</td>
                <td data-label="Status">{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsManagement;
