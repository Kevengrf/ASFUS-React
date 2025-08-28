// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correção: Instalar jwt-decode se necessário
import apiService from '../api/apiService';

// 1. Criação do Contexto
const AuthContext = createContext(null);

// 2. Criação do Provedor do Contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [loading, setLoading] = useState(true);

  // Efeito para carregar o estado de autenticação na inicialização
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        // Verifica se o token não expirou
        if (decodedUser.exp * 1000 > Date.now()) {
          setUser(decodedUser);
          setToken(storedToken);
        } else {
          // Se o token expirou, limpa
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  // Função de Login
  const login = async (email, password) => {
    try {
      const response = await apiService.post('/auth/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('authToken', token);
      const decodedUser = jwtDecode(token);
      
      setUser(decodedUser);
      setToken(token);

      return { success: true, user: decodedUser };
    } catch (error) {
      console.error("Falha no login:", error);
      return { success: false, message: error.response?.data?.message || "Erro ao fazer login." };
    }
  };
  
    // Função de Login do Admin
  const adminLogin = async (email, password) => {
    // PROTOTYPE MODE: Bypass actual login for any credentials
    if (process.env.REACT_APP_PROTOTYPE_MODE === 'true') {
      const mockUser = { id: 2, nome: 'Usuário Teste', email: email, isAdmin: false }; // Use provided email
      localStorage.setItem('authToken', 'mock-associado-token');
      setUser(mockUser);
      setToken('mock-associado-token');
      return { success: true, user: mockUser };
    }

    try {
      // Assumindo um endpoint diferente para login de admin
      const response = await apiService.post('/auth/admin/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('authToken', token);
      const decodedUser = jwtDecode(token);
      
      // Adiciona uma propriedade para diferenciar o admin
      setUser({ ...decodedUser, isAdmin: true });
      setToken(token);

      return { success: true, user: { ...decodedUser, isAdmin: true } };
    } catch (error) {
      console.error("Falha no login de admin:", error);
      return { success: false, message: error.response?.data?.message || "Erro ao fazer login de admin." };
    }
  };

  // Função de Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  // Função de Registro (Pré-cadastro)
  const register = async (userData) => {
    try {
      // CORREÇÃO: O endpoint foi ajustado de '/associados/pre-cadastro' 
      // para '/auth/register' para alinhar com a API do backend.
      const response = await apiService.post('/auth/register', userData);
      
      // A resposta de sucesso é retornada como antes.
      return { success: true, data: response.data };
    } catch (error) {
      // O tratamento de erro foi mantido para notificar o usuário sobre falhas.
      console.error("Erro no pré-cadastro:", error);
      return { success: false, message: error.response?.data?.message || "Erro ao realizar pré-cadastro." };
    }
  };

  // O valor que será provido para os componentes filhos
  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    loading,
    login,
    adminLogin,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
