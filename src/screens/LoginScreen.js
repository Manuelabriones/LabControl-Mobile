
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

import { useAuth } from '../context/AuthContext';
import AuthHero from '../components/AuthHero';

const LoginScreen = ({ navigation }) => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Iniciar sesión
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Campos obligatorios', 'Ingresa tu correo y contraseña.');
      return;
    }

    try {
      setLoading(true);

      await signIn({
        email: email.trim(),
        password,
      });
    } catch (error) {
      Alert.alert(
        'Error al iniciar sesión',
        error.message || 'No se pudo iniciar sesión.'
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
          <Text style={styles.heading}>Sign In</Text>
          <Text style={styles.description}>
            Welcome back to LabControl
          </Text>

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

          <View style={styles.options}>
            <Pressable
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={styles.checkbox}>
                {rememberMe && <Text style={styles.check}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                Alert.alert(
                  'Forgot password?',
                  'La recuperación de contraseña estará disponible próximamente.'
                )
              }
            >
              <Text style={styles.forgotText}>Forgot your password?</Text>
            </Pressable>
          </View>

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>⇥  Log In</Text>
            )}
          </Pressable>

          <View style={styles.divider} />

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don't have an account?
            </Text>

            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Create Account</Text>
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
    backgroundColor: '#F4F6FA',
    paddingBottom: 0,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -8,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 24,
    minHeight: 375,
    zIndex: 3,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#142D4E',
  },
  description: {
    color: '#64748B',
    fontSize: 12,
    marginBottom: 24,
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
    marginBottom: 10,
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
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 22,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '#94A3B8',
    borderRadius: 3,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    color: '#E21B2D',
    fontSize: 11,
    fontWeight: 'bold',
  },
  rememberText: {
    color: '#475569',
    fontSize: 10,
  },
  forgotText: {
    color: '#E21B2D',
    fontSize: 10,
    fontWeight: '600',
  },
  button: {
    height: 43,
    backgroundColor: '#D71929',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 24,
    marginBottom: 18,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
  },
  registerText: {
    color: '#64748B',
    fontSize: 10,
  },
  registerLink: {
    color: '#D71929',
    fontSize: 10,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 15,
  },
});


export default LoginScreen;
