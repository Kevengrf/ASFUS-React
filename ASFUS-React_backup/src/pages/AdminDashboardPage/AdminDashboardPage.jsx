// src/pages/AdminDashboardPage/AdminDashboardPage.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './AdminDashboardPage.module.css';

const AdminDashboardPage = () => {
  return (
    <div className={styles.dashboardLayout}>
        <aside className={styles.sidebar}>
          <nav className={styles.sideNav}>
            <h3>Gerenciamento</h3>
            <NavLink 
              to="approvals" 
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              Aprovações
            </NavLink>
            <NavLink 
              to="news" 
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              Notícias
            </NavLink>
            <NavLink 
              to="convenios" 
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              Convênios
            </NavLink>
            <NavLink 
              to="events" 
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              Eventos
            </NavLink>
            <NavLink 
              to="gallery" 
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              Galeria
            </NavLink>
            <NavLink 
              to="home-content" 
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              Conteúdo da Página Inicial
            </NavLink>
            <NavLink 
              to="associates" 
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              Gerenciamento de Associados
            </NavLink>
          </nav>
        </aside>
        <main className={styles.mainContent}>
          {/* O conteúdo da rota aninhada será renderizado aqui */}
          <Outlet />
        </main>
      </div>
  );
};

export default AdminDashboardPage;