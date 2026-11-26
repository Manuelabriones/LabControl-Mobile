
import { API_URL, API_APP_TOKEN } from '../config/env';

// Configuración de las peticiones a la API
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': API_APP_TOKEN,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al conectar con el servidor');
    }

    return data;
  } catch (error) {
    console.error('Error en la petición API:', error);
    throw error;
  }
};
