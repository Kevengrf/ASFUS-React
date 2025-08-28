// src/pages/admin/AssociatesManagement.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import Modal from '../../components/Modal/Modal';
import styles from '../../pages/AdminDashboardPage/AdminDashboardPage.module.css';
import AssociateForm from './AssociateForm';
import { utils, writeFile } from 'xlsx';

const AssociatesManagement = () => {
  const [associates, setAssociates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssociate, setEditingAssociate] = useState(null);

  const fetchAssociates = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/associados');
      setAssociates(response.data);
    } catch (error) {
      console.error("Erro ao buscar associados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssociates();
  }, []);

  const handleOpenModal = (associate = null) => {
    setEditingAssociate(associate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAssociate(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingAssociate) {
        await apiService.put(`/associados/${editingAssociate.id}`, formData);
      } else {
        await apiService.post('/associados', formData);
      }
      fetchAssociates();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar associado:", error);
      alert("Falha ao salvar associado.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este associado?")) {
      try {
        await apiService.delete(`/associados/${id}`);
        fetchAssociates();
      } catch (error) {
        console.error("Erro ao excluir associado:", error);
        alert("Falha ao excluir associado.");
      }
    }
  };

  const handleDownloadXLS = () => {
    const ws = utils.json_to_sheet(associates);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Associados");
    writeFile(wb, "associados.xlsx");
  };

  if (loading) return <p>Carregando associados...</p>;

  return (
    <div>
      <h2>Gerenciamento de Associados</h2>
      <button onClick={() => handleOpenModal()} className={styles.prominentButton}>Adicionar Novo Associado</button>
      <button onClick={handleDownloadXLS} className={styles.prominentButton}>Download XLS</button>

      <div className={styles.tableWrapper}>
        <table className={styles.managementTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {associates.map(associate => (
              <tr key={associate.id}>
                <td data-label="Nome">{associate.nome}</td>
                <td data-label="Email">{associate.email}</td>
                <td data-label="CPF">{associate.cpf}</td>
                <td data-label="Telefone">{associate.telefone}</td>
                <td data-label="Ações" className={styles.actions}>
                  <button onClick={() => handleOpenModal(associate)} className={styles.editButton}>Editar</button>
                  <button onClick={() => handleDelete(associate.id)} className={styles.deleteButton}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingAssociate ? 'Editar Associado' : 'Adicionar Associado'}>
        <AssociateForm onSubmit={handleFormSubmit} initialData={editingAssociate} />
      </Modal>
    </div>
  );
};

export default AssociatesManagement;
