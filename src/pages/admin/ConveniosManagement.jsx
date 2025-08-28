// src/pages/admin/ConveniosManagement.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import Modal from '../../components/Modal/Modal';
import styles from '../../pages/AdminDashboardPage/AdminDashboardPage.module.css';

const ConveniosManagement = () => {
  const [convenios, setConvenios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConvenio, setEditingConvenio] = useState(null);

  const fetchConvenios = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/convenios');
      setConvenios(response.data);
    } catch (error) {
      console.error("Erro ao buscar convênios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConvenios();
  }, []);

  const handleOpenModal = (convenio = null) => {
    setEditingConvenio(convenio);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingConvenio(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingConvenio) {
        await apiService.put(`/convenios/${editingConvenio.id}`, formData);
      } else {
        await apiService.post('/convenios', formData);
      }
      fetchConvenios();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar convênio:", error);
      alert("Falha ao salvar convênio.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este convênio?")) {
      try {
        await apiService.delete(`/convenios/${id}`);
        fetchConvenios();
      } catch (error) {
        console.error("Erro ao excluir convênio:", error);
        alert("Falha ao excluir convênio.");
      }
    }
  };

  if (loading) return <p>Carregando convênios...</p>;

  return (
    <div>
      <h2>Gerenciamento de Convênios</h2>
      <button onClick={() => handleOpenModal()} className={styles.addButton}>Adicionar Novo Convênio</button>

      <div className={styles.tableWrapper}> {/* Adicionado para rolagem horizontal em mobile */}
        <table className={styles.managementTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Benefício</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {convenios.map(convenio => (
              <tr key={convenio.id}>
                <td data-label="Nome">{convenio.name}</td>
                <td data-label="Categoria">{convenio.category}</td>
                <td data-label="Benefício">{convenio.benefit}</td>
                <td data-label="Ações" className={styles.actions}>
                  <button onClick={() => handleOpenModal(convenio)} className={styles.editButton}>Editar</button>
                  <button onClick={() => handleDelete(convenio.id)} className={styles.deleteButton}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingConvenio ? 'Editar Convênio' : 'Adicionar Convênio'}>
        <ConvenioForm onSubmit={handleFormSubmit} initialData={editingConvenio} />
      </Modal>
    </div>
  );
};

// Formulário interno
const ConvenioForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [benefit, setBenefit] = useState(initialData?.benefit || '');
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, category, benefit, logoUrl });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome do Convênio" required />
      <label>Categoria</label>
      <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Categoria" required />
      <label>Benefício</label>
      <input type="text" value={benefit} onChange={e => setBenefit(e.target.value)} placeholder="Benefício" required />
      <label>URL do Logo</label>
      <input type="text" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="URL do Logo" />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ConveniosManagement;