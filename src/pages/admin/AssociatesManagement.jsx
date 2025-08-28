// src/pages/admin/AssociatesManagement.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import Modal from '../../components/Modal/Modal';
import * as XLSX from 'xlsx';
import styles from '../../pages/AdminDashboardPage/AdminDashboardPage.module.css';

const AssociatesManagement = () => {
  const [associados, setAssociados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssociate, setEditingAssociate] = useState(null);

  const fetchAssociados = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/associados');
      setAssociados(response.data);
    } catch (error) {
      console.error("Erro ao buscar associados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssociados();
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
      fetchAssociados();
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
        fetchAssociados();
      } catch (error) {
        console.error("Erro ao excluir associado:", error);
        alert("Falha ao excluir associado.");
      }
    }
  };

  const handleDownloadXLS = () => {
    const worksheet = XLSX.utils.json_to_sheet(associados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Associados");
    XLSX.writeFile(workbook, "associados.xlsx");
  };

  if (loading) return <p>Carregando associados...</p>;

  return (
    <div>
      <div className={styles.buttonContainer}>
        <h2>Gerenciamento de Associados</h2>
        <div>
          <button onClick={() => handleOpenModal()} className={styles.beautifulButton}>Adicionar Novo Associado</button>
          <button onClick={handleDownloadXLS} className={styles.beautifulButton}>Download XLS</button>
        </div>
      </div>

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
            {associados.map(associate => (
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

// Formulário interno
const AssociateForm = ({ onSubmit, initialData }) => {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [cpf, setCpf] = useState(initialData?.cpf || '');
  const [dataNascimento, setDataNascimento] = useState(initialData?.dataNascimento || '');
  const [telefone, setTelefone] = useState(initialData?.telefone || '');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, email, cpf, dataNascimento, telefone, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome</label>
      <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome Completo" required />
      <label>Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <label>CPF</label>
      <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="CPF" required />
      <label>Data de Nascimento</label>
      <input type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} placeholder="Data de Nascimento" required />
      <label>Telefone</label>
      <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Telefone" />
      <label>Senha</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha (deixe em branco para não alterar)" />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default AssociatesManagement;
