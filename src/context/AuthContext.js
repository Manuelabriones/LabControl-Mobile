
import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login as loginService } from '../services/authService';

const AuthContext = createContext(null);

const TOKEN_KEY = '@labcontrol_token';
const USER_KEY = '@labcontrol_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Recuperar la sesión guardada
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken = await AsyncStorage.getItem(TOKEN_KEY);
        const savedUser = await AsyncStorage.getItem(USER_KEY);

        if (savedToken) {
          setToken(savedToken);
        }

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error al recuperar la sesión:', error);
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Iniciar sesión
  const signIn = async (credentials) => {
    const response = await loginService(credentials);

    const accessToken =
      response.token ??
      response.accessToken ??
      response.access_token;

    const userData =
      response.user ??
      response.usuario ??
      response.data?.user ??
      response.data?.usuario ??
      null;

    if (!accessToken) {
      throw new Error(
        'La respuesta de la API no contiene un token de sesión. Debemos revisar su formato.'
      );
    }

    await AsyncStorage.setItem(TOKEN_KEY, accessToken);

    if (userData) {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    }

    setToken(accessToken);
    setUser(userData);

    return response;
  };

  // Cerrar sesión
  const signOut = async () => {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(token),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para utilizar la autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  }

  return context;
};
