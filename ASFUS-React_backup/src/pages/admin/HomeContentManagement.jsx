// src/pages/admin/HomeContentManagement.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import styles from './AdminPages.module.css';

const HomeContentManagement = () => {
  const [news, setNews] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newContent, setNewContent] = useState({
    type: 'news',
    title: '',
    content: '',
    priority: 'normal'
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const [newsResponse, announcementsResponse] = await Promise.all([
        apiService.get('/news'),
        apiService.get('/announcements')
      ]);
      setNews(newsResponse.data);
      setAnnouncements(announcementsResponse.data);
    } catch {
      setError('Falha ao buscar conteúdo.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newContent.type === 'news') {
        await apiService.post('/news', newContent);
      } else {
        await apiService.post('/announcements', newContent);
      }
      setNewContent({ type: 'news', title: '', content: '', priority: 'normal' });
      fetchContent();
    } catch {
      setError('Falha ao adicionar conteúdo.');
    }
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === 'news') {
        await apiService.delete(`/news/${id}`);
      } else {
        await apiService.delete(`/announcements/${id}`);
      }
      fetchContent();
    } catch {
      setError('Falha ao excluir conteúdo.');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className={styles.errorMessage}>{error}</p>;

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>Gerenciamento de Conteúdo da Página Inicial</h1>
      
      <div className={styles.contentForm}>
        <h2>Adicionar Novo Conteúdo</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <select 
              value={newContent.type} 
              onChange={(e) => setNewContent({...newContent, type: e.target.value})}
              className={styles.select}
            >
              <option value="news">Notícia</option>
              <option value="announcements">Anúncio</option>
            </select>
            <select 
              value={newContent.priority} 
              onChange={(e) => setNewContent({...newContent, priority: e.target.value})}
              className={styles.select}
            >
              <option value="low">Baixa Prioridade</option>
              <option value="normal">Normal</option>
              <option value="high">Alta Prioridade</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Título"
            value={newContent.title}
            onChange={(e) => setNewContent({...newContent, title: e.target.value})}
            className={styles.input}
            required
          />
          <textarea
            placeholder="Conteúdo"
            value={newContent.content}
            onChange={(e) => setNewContent({...newContent, content: e.target.value})}
            className={styles.textarea}
            rows="4"
            required
          />
          <button type="submit" className={styles.button}>Adicionar Conteúdo</button>
        </form>
      </div>

      <div className={styles.contentSections}>
        <div className={styles.contentSection}>
          <h2>Notícias</h2>
          <div className={styles.contentGrid}>
            {news.map(item => (
              <div key={item.id} className={`${styles.contentCard} ${styles[item.priority]}`}>
                <div className={styles.contentHeader}>
                  <span className={styles.priorityBadge}>{item.priority}</span>
                  <button 
                    onClick={() => handleDelete(item.id, 'news')}
                    className={styles.deleteButton}
                  >
                    ×
                  </button>
                </div>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.contentSection}>
          <h2>Anúncios</h2>
          <div className={styles.contentGrid}>
            {announcements.map(item => (
              <div key={item.id} className={`${styles.contentCard} ${styles[item.priority]}`}>
                <div className={styles.contentHeader}>
                  <span className={styles.priorityBadge}>{item.priority}</span>
                  <button 
                    onClick={() => handleDelete(item.id, 'announcements')}
                    className={styles.deleteButton}
                  >
                    ×
                  </button>
                </div>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContentManagement;
