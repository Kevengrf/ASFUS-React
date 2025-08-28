// src/pages/PortalPage/PortalPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import useAuth from '../../hooks/useAuth';
import apiService from '../../api/apiService';
import Modal from '../../components/Modal/Modal';
import styles from './PortalPage.module.css';

const PortalPage = () => {
  const { user } = useAuth();
  const [associado, setAssociado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para buscar os dados do associado
  const fetchAssociadoData = useCallback(async () => {
    try {
      setLoading(true);
      // O ID do usuário é pego do token decodificado
      const response = await apiService.get(`/associados/${user.id}`);
      setAssociado(response.data);
      setError('');
    } catch (err) {
      setError('Falha ao carregar os dados do associado.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    if (user?.id) {
      fetchAssociadoData();
    }
  }, [user, fetchAssociadoData]);

  

  if (loading) return <p className={styles.loading}>Carregando portal...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!associado) return <p>Nenhum dado de associado encontrado.</p>;

  return (
    <div className={styles.portalContainer}>
      <h1 className={styles.welcome}>Bem-vindo(a) ao seu portal, {associado.nome}!</h1>

      <div className={styles.infoSection}>
        <h2>Seus Dados</h2>
        <p><strong>Email:</strong> {associado.email}</p>
        <p><strong>CPF:</strong> {associado.cpf}</p>
        <p><strong>Data de Nascimento:</strong> {new Date(associado.dataNascimento).toLocaleDateString()}</p>
        <p><strong>Telefone:</strong> {associado.telefone}</p>
      </div>

      

      
    </div>
  );
};



export default PortalPage;
