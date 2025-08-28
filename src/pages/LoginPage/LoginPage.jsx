// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react'; // Keep useState for showPassword if needed, but remove if not
import { useNavigate } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth'; // No longer needed
import styles from './LoginPage.module.css';

// SVG do ícone de olho, para não depender de bibliotecas externas
const EyeIcon = ({ size = 22, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = useState(''); // Keep for illustrative purposes
  const [password, setPassword] = useState(''); // Keep for illustrative purposes
  const [showPassword, setShowPassword] = useState(false); // Keep for illustrative purposes

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/portal'); // Directly navigate to associate dashboard
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Login do Associado</h1>
        <p className={styles.subtitle}>Acesse o portal para ver seus benefícios.</p>

        {/* No error message needed */}

        <div className={styles.form}> {/* Changed from form to div */}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='seuemail@exemplo.com'
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'} // Altera o tipo do input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Sua senha'
              />
              <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                <EyeIcon />
              </span>
            </div>
          </div>
          <button type="button" className={styles.loginButton} onClick={handleLoginClick}> {/* Changed type to button and added onClick */}
            Entrar
          </button>
        </div> {/* Changed from form to div */}
      </div>
    </div>
  );
};

export default LoginPage;
