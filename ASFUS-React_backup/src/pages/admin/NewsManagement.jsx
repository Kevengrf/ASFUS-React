// src/pages/admin/NewsManagement.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import Modal from '../../components/Modal/Modal';
import styles from '../../pages/AdminDashboardPage/AdminDashboardPage.module.css'; // Reutilizando estilos

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null); // null para criar, objeto para editar

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/news');
      setNews(response.data);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOpenModal = (notice = null) => {
    setEditingNews(notice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingNews) {
        // Atualizar notícia existente
        await apiService.put(`/news/${editingNews.id}`, formData);
      } else {
        // Criar nova notícia
        await apiService.post('/news', formData);
      }
      fetchNews(); // Re-fetch da lista
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar notícia:", error);
      alert("Falha ao salvar notícia.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta notícia?")) {
      try {
        await apiService.delete(`/news/${id}`);
        fetchNews(); // Re-fetch da lista
      } catch (error) {
        console.error("Erro ao excluir notícia:", error);
        alert("Falha ao excluir notícia.");
      }
    }
  };

  if (loading) return <p>Carregando notícias...</p>;

  return (
    <div>
      <h2>Gerenciamento de Notícias</h2>
      <button onClick={() => handleOpenModal()} className={styles.addButton}>Adicionar Nova Notícia</button>

      <div className={styles.tableWrapper}> {/* Adicionado para rolagem horizontal em mobile */}
        <table className={styles.managementTable}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {news.map(notice => (
              <tr key={notice.id}>
                <td data-label="Título">{notice.title}</td>
                <td data-label="Data de Criação">{new Date(notice.createdAt).toLocaleDateString()}</td>
                <td data-label="Ações" className={styles.actions}>
                  <button onClick={() => handleOpenModal(notice)} className={styles.editButton}>Editar</button>
                  <button onClick={() => handleDelete(notice.id)} className={styles.deleteButton}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingNews ? 'Editar Notícia' : 'Adicionar Notícia'}>
        <NewsForm onSubmit={handleFormSubmit} initialData={editingNews} />
      </Modal>
    </div>
  );
};

// Componente de formulário interno
const NewsForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Título</label>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      <label>Conteúdo</label>
      <textarea rows="5" value={content} onChange={e => setContent(e.target.value)} required />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default NewsManagement;