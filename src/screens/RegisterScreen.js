
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import { register } from '../services/authService';
import AuthHero from '../components/AuthHero';

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Registrar usuario
  const handleRegister = async () => {
    if (!nombre.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Campos obligatorios', 'Completa todos los campos.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Correo inválido', 'Ingresa un correo válido.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Contraseña inválida', 'Debe tener al menos 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      setLoading(true);

      await register({
        nombre: nombre.trim(),
        email: email.trim(),
        password,
      });

      Alert.alert(
        'Registro exitoso',
        'Tu cuenta fue creada correctamente.',
        [{ text: 'Continuar', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert(
        'Error de registro',
        error.message || 'No se pudo registrar el usuario.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <AuthHero />

        <View style={styles.card}>
          <Text style={styles.heading}>Create Account</Text>
          <Text style={styles.description}>
            Register a new user
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>♙</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#94A3B8"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>✉</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>▣</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeIcon}>
                {showPassword ? 'Ocultar' : '◉'}
              </Text>
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>▣</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>♙  Register</Text>
            )}
          </Pressable>

          <View style={styles.divider} />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>

            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.footer}>LabControl © 2026</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#142D4E',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F5F7FB',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 25,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#142D4E',
  },
  description: {
    color: '#64748B',
    fontSize: 12,
    marginBottom: 17,
    marginTop: 3,
  },
  inputContainer: {
    height: 43,
    borderWidth: 1,
    borderColor: '#DCE3ED',
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 9,
    backgroundColor: '#F8FAFC',
  },
  inputIcon: {
    color: '#64748B',
    fontSize: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#142D4E',
    fontSize: 12,
  },
  eyeIcon: {
    color: '#64748B',
    fontSize: 15,
    padding: 5,
  },
  button: {
    height: 46,
    backgroundColor: '#D71929',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 20,
    marginBottom: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  loginText: {
    color: '#64748B',
    fontSize: 11,
  },
  loginLink: {
    color: '#D71929',
    fontSize: 11,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 20,
  },
});

export default RegisterScreen;
