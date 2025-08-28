// src/pages/admin/ApprovalsManagement.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import styles from '../../pages/AdminDashboardPage/AdminDashboardPage.module.css'; // Reutilizando estilos antigos por enquanto

const ApprovalsManagement = () => {
  const [preCadastros, setPreCadastros] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPreCadastros = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/admin/pre-cadastros');
      setPreCadastros(response.data);
    } catch (error) {
      console.error("Erro ao buscar pré-cadastros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreCadastros();
  }, []);

  const handleApproval = async (associadoId, aprovar) => {
    try {
        const action = aprovar ? 'aprovar' : 'reprovar';
        await apiService.post(`/admin/pre-cadastros/${associadoId}/${action}`);
        setPreCadastros(prev => prev.filter(p => p.id !== associadoId));
    } catch (error) {
        console.error(`Erro ao ${aprovar ? 'aprovar' : 'reprovar'} cadastro:`, error);
        alert('Ação não pôde ser completada.');
    }
  };

  return (
    <div className={styles.section}>
      <h2>Aprovações Pendentes</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : preCadastros.length > 0 ? (
        <div className={styles.approvalGrid}>
          {preCadastros.map(cadastro => (
            <div key={cadastro.id} className={styles.approvalCard}>
              <div className={styles.cardBody}>
                <p><strong>Nome:</strong> {cadastro.nome}</p>
                <p><strong>Email:</strong> {cadastro.email}</p>
                <p><strong>CPF:</strong> {cadastro.cpf}</p>
              </div>
              <div className={styles.cardActions}>
                <button onClick={() => handleApproval(cadastro.id, true)} className={`${styles.button} ${styles.approveButton}`}>Aprovar</button>
                <button onClick={() => handleApproval(cadastro.id, false)} className={`${styles.button} ${styles.rejectButton}`}>Reprovar</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum pré-cadastro pendente.</p>
      )}
    </div>
  );
};

export default ApprovalsManagement;
