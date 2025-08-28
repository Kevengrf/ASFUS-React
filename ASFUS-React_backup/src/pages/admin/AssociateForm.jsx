// src/pages/admin/AssociateForm.jsx
import React, { useState } from 'react';
import styles from '../../pages/AdminDashboardPage/AdminDashboardPage.module.css';

const AssociateForm = ({ onSubmit, initialData }) => {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [cpf, setCpf] = useState(initialData?.cpf || '');
  const [telefone, setTelefone] = useState(initialData?.telefone || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, email, cpf, telefone });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label>Nome</label>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do Associado" required />
      </div>
      <div className={styles.formGroup}>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      </div>
      <div className={styles.formGroup}>
        <label>CPF</label>
        <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="CPF" required />
      </div>
      <div className={styles.formGroup}>
        <label>Telefone</label>
        <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Telefone" />
      </div>
      <button type="submit" className={styles.addButton}>Salvar</button>
    </form>
  );
};

export default AssociateForm;
