// src/components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h4>Contato Rápido</h4>
          <p>Email: contato@asfus.com.br</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Redes Sociais</h4>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} ASFUS. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
