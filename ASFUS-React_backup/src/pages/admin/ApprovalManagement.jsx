
// src/pages/admin/ApprovalManagement.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import styles from './AdminPages.module.css';

const ApprovalManagement = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await apiService.get('/auth/pending');
        setPendingUsers(response.data);
      } catch {
        setError('Falha ao buscar usuários pendentes.');
      }
      setLoading(false);
    };

    fetchPendingUsers();
  }, []);

  const handleApproval = async (userId, approve) => {
    try {
      await apiService.put(`/auth/approve/${userId}`, { approve });
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
    } catch {
      setError(`Falha ao ${approve ? 'aprovar' : 'recusar'} usuário.`);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className={styles.errorMessage}>{error}</p>;

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>Gerenciamento de Aprovações</h1>
      {pendingUsers.length === 0 ? (
        <p>Nenhum usuário pendente no momento.</p>
      ) : (
        <div className={styles.pendingUsersGrid}>
          {pendingUsers.map(user => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.userAvatar}>
                <span>{user.nome.charAt(0).toUpperCase()}</span>
              </div>
              <div className={styles.userInfo}>
                <h3>{user.nome}</h3>
                <div className={styles.userDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>📧</span>
                    <span>{user.email}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>🆔</span>
                    <span>{user.cpf}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>📱</span>
                    <span>{user.telefone}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>🎂</span>
                    <span>{new Date(user.dataNascimento).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className={styles.userActions}>
                <button 
                  className={`${styles.actionButton} ${styles.approveButton}`} 
                  onClick={() => handleApproval(user.id, true)}
                >
                  <span className={styles.buttonIcon}>✓</span>
                  <span>Aprovar</span>
                </button>
                <button 
                  className={`${styles.actionButton} ${styles.declineButton}`} 
                  onClick={() => handleApproval(user.id, false)}
                >
                  <span className={styles.buttonIcon}>✗</span>
                  <span>Recusar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovalManagement;
