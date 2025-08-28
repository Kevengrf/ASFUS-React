// src/components/ProtectedRoute/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

/**
 * Componente para proteger rotas que exigem autenticação.
 * @param {{ children: React.ReactNode, adminOnly?: boolean }} props
 * - `children`: O componente filho a ser renderizado se o usuário estiver autenticado.
 * - `adminOnly`: Se a rota é exclusiva para administradores.
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  // POC MODE: Permitir acesso direto para demonstração
  const isPOCMode = true; // Set to false in production

  // Enquanto o estado de autenticação está carregando, não renderiza nada
  if (loading) {
    return null; // Ou um componente de spinner/loading
  }

  // PROTOTYPE MODE: Se estiver em modo POC, permitir acesso direto SEMPRE
  if (isPOCMode) {
    return children;
  }

  // PRODUCTION MODE: Verificações normais de autenticação
  // Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se a rota é apenas para admin e o usuário não é admin, redireciona
  if (adminOnly && !isAdmin) {
    // Pode redirecionar para uma página de "Não Autorizado" ou para o portal normal
    return <Navigate to="/portal" replace />;
  }

  // Se tudo estiver ok, renderiza o componente filho
  return children;
};

export default ProtectedRoute;
