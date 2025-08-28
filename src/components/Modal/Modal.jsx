// src/components/Modal/Modal.jsx
import React from 'react';
import styles from './Modal.module.css';

/**
 * Componente de Modal genérico e reutilizável.
 * @param {{ isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }} props
 * - `isOpen`: Controla a visibilidade do modal.
 * - `onClose`: Função para fechar o modal.
 * - `title`: O título exibido no cabeçalho do modal.
 * - `children`: O conteúdo a ser renderizado dentro do modal.
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  // Impede o fechamento do modal ao clicar no conteúdo interno
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // O overlay (fundo escuro) que fecha o modal ao ser clicado
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={handleContentClick}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
