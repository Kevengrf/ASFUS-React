import React from 'react';
import styles from './AsfusLogo.module.css';

/**
 * Componente da Logo ASFUS animada, criada com CSS.
 * A animação é acionada quando o componente é renderizado.
 */
const AsfusLogo = () => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoShapes}>
        <div className={`${styles.shape} ${styles.top}`}></div>
        <div className={`${styles.shape} ${styles.bottom}`}></div>
      </div>
      <span className={styles.logoText}>ASFUS</span>
    </div>
  );
};

export default AsfusLogo;