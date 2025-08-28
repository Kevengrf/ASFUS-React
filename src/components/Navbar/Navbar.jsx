// src/components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from './Navbar.module.css';
import AsfusLogo from '../AsfusLogo/AsfusLogo'; // Importa o novo componente da logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar o menu mobile
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redireciona para a home após o logout
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.navLogo} onClick={closeMenu}>
          <AsfusLogo /> {/* Usa o componente da logo aqui */}
        </NavLink>

        <div className={styles.menuToggle} onClick={toggleMenu}>
          {/* Ícone de hambúrguer ou X */}
          {isOpen ? '✕' : '☰'}
        </div>

        <ul className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
          <li className={styles.navItem}>
            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={closeMenu}>Home</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/gallery" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={closeMenu}>Galeria</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={closeMenu}>Contato</NavLink>
          </li>
          
          {isAuthenticated ? (
            <>
              <li className={styles.navItem}>
                <NavLink to={user.isAdmin ? "/admin/dashboard" : "/portal"} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={closeMenu}>
                  {user.isAdmin ? 'Dashboard' : 'Portal do Associado'}
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <button onClick={() => { handleLogout(); closeMenu(); }} className={styles.navButton}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.navItem}>
                <NavLink to="/login" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={closeMenu}>Login Associado</NavLink>
              </li>
               <li className={styles.navItem}>
                <NavLink to="/admin/login" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={closeMenu}>Login Admin</NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink to="/register" className={`${styles.navLink} ${styles.navButtonRegister}`} onClick={closeMenu}>Pré-Cadastro</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
