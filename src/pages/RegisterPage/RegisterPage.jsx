// src/pages/RegisterPage/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    dependentes: [],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleTitularChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDependenteChange = (index, e) => {
    const { name, value } = e.target;
    const novosDependentes = [...formData.dependentes];
    novosDependentes[index][name] = value;
    setFormData((prev) => ({ ...prev, dependentes: novosDependentes }));
  };

  const adicionarDependente = () => {
    setFormData((prev) => ({
      ...prev,
      dependentes: [...prev.dependentes, { nome: '', dataNascimento: '', parentesco: '' }],
    }));
  };

  const removerDependente = (index) => {
    const novosDependentes = formData.dependentes.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, dependentes: novosDependentes }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.senha.length < 6) {
        setError("A senha deve ter no mínimo 6 caracteres.");
        setLoading(false);
        return;
    }

    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      setSuccess('Pré-cadastro realizado com sucesso! Você será notificado após a aprovação.');
      setTimeout(() => navigate('/login'), 3000);
    } else {
      setError(result.message || 'Ocorreu um erro no pré-cadastro.');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.registerCard}>
        <h1 className={styles.title}>Pré-Cadastro de Associado</h1>
        <p className={styles.subtitle}>Preencha seus dados para iniciar o processo de associação.</p>

        {error && <p className={styles.alertError}>{error}</p>}
        {success && <p className={styles.alertSuccess}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <fieldset className={styles.fieldset}>
            <legend>Dados do Titular</legend>
            <div className={styles.formGrid}>
              <input type="text" name="nome" placeholder="Nome Completo" onChange={handleTitularChange} required />
              <input type="email" name="email" placeholder="Email" onChange={handleTitularChange} required />
              <input type="password" name="senha" placeholder="Senha (mínimo 6 caracteres)" onChange={handleTitularChange} required />
              <input type="text" name="cpf" placeholder="CPF" onChange={handleTitularChange} required />
              <input type="date" name="dataNascimento" placeholder="Data de Nascimento" onChange={handleTitularChange} required />
              <input type="tel" name="telefone" placeholder="Telefone" onChange={handleTitularChange} required />
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>Dependentes</legend>
            {formData.dependentes.map((dependente, index) => (
              <div key={index} className={styles.dependenteBox}>
                <div className={styles.dependenteHeader}>
                  <h4>Dependente {index + 1}</h4>
                  <button type="button" className={styles.removeButton} onClick={() => removerDependente(index)}>×</button>
                </div>
                <div className={styles.formGrid}>
                  <input type="text" name="nome" placeholder="Nome do Dependente" value={dependente.nome} onChange={(e) => handleDependenteChange(index, e)} required />
                  <input type="date" name="dataNascimento" placeholder="Data de Nascimento" value={dependente.dataNascimento} onChange={(e) => handleDependenteChange(index, e)} required />
                  <input type="text" name="parentesco" placeholder="Parentesco" value={dependente.parentesco} onChange={(e) => handleDependenteChange(index, e)} required />
                </div>
              </div>
            ))}
            <button type="button" className={styles.addButton} onClick={adicionarDependente}>+ Adicionar Dependente</button>
          </fieldset>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Enviando...' : 'Realizar Pré-Cadastro'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;