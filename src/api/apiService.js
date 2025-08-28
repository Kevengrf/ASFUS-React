// src/api/apiService.js
import axios from 'axios';

// Cria uma instância centralizada do axios
const apiService = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Adiciona um interceptador de requisição para injetar o token JWT
apiService.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage
    const token = localStorage.getItem('authToken');

    // Se o token existir, anexa ao cabeçalho Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Em caso de erro na configuração da requisição
    return Promise.reject(error);
  }
);

export default apiService;
