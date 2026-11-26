
import { apiRequest } from './api';

// Iniciar sesión
export const login = async (credentials) => {
  return await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

// Registrar usuario
export const register = async (userData) => {
  return await apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// Obtener información del usuario autenticado
export const getCurrentUser = async (token) => {
  return await apiRequest('/api/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
