
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import BottomTabNavigator from './src/components/BottomTabNavigator';

// Controlar la navegación según el estado de autenticación
const AppContent = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D71929" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#142D4E',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
