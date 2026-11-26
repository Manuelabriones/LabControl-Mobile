
import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';
import AppHeader from '../components/AppHeader';

const ProfileScreen = ({ navigation }) => {
  const { user, signOut } = useAuth();

  const initialName =
    user?.nombre ??
    user?.name ??
    user?.fullName ??
    '';

  const initialEmail = user?.email ?? '';

  const [fullName, setFullName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const userId =
    user?.matricula ??
    user?.userId ??
    user?.id ??
    'N/A';

  const role = user?.role ?? user?.rol ?? 'User';

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : 'N/A';

  // Cancelar cambios
  const handleCancel = () => {
    setFullName(initialName);
    setEmail(initialEmail);
    setCurrentPassword('');
    setNewPassword('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
  };

  // Guardar cambios
  const handleSave = () => {
    if (!fullName.trim() || !email.trim()) {
      Alert.alert(
        'Campos obligatorios',
        'El nombre y el correo son obligatorios.'
      );
      return;
    }

    Alert.alert(
      'Actualización pendiente',
      'La conexión para guardar los cambios del perfil se integrará con la API.'
    );
  };

  // Cerrar sesión
  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás segura de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert(
                'Error',
                'No se pudo cerrar la sesión.'
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        onProfilePress={() => navigation.navigate('Profile')}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>My Profile</Text>
        <Text style={styles.subtitle}>Account information</Text>

        {/* User Information */}
        <View style={styles.userCard}>
          <View style={styles.userHeader}>
            <View style={styles.avatar}>
              <Ionicons
                name="person"
                size={29}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.userMainInfo}>
              <Text style={styles.userName}>
                {fullName || 'User'}
              </Text>

              <View style={styles.roleBadge}>
                <Text style={styles.roleBadgeText}>
                  {role}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="mail-outline"
              size={14}
              color="#142D4E"
              style={styles.infoIcon}
            />

            <Text style={styles.infoLabel}>Email</Text>

            <Text style={styles.infoValue} numberOfLines={1}>
              {initialEmail || 'N/A'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="card-outline"
              size={14}
              color="#142D4E"
              style={styles.infoIcon}
            />

            <Text style={styles.infoLabel}>User ID</Text>

            <Text style={styles.infoValue}>
              {userId}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="people-outline"
              size={14}
              color="#142D4E"
              style={styles.infoIcon}
            />

            <Text style={styles.infoLabel}>Role</Text>

            <Text style={styles.infoValue}>
              {role}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color="#142D4E"
              style={styles.infoIcon}
            />

            <Text style={styles.infoLabel}>Member Since</Text>

            <Text style={styles.infoValue}>
              {memberSince}
            </Text>
          </View>
        </View>

        {/* Update Information */}
        <View style={styles.formCard}>
          <View style={styles.formTitleContainer}>
            <Ionicons
              name="create-outline"
              size={18}
              color="#D71929"
            />

            <Text style={styles.formTitle}>
              Update Information
            </Text>
          </View>

          {/* Full Name */}
          <Text style={styles.label}>Full Name *</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#94A3B8"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Email */}
          <Text style={styles.label}>Email *</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* Current Password */}
          <Text style={styles.label}>Current Password *</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Current password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showCurrentPassword}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />

            <Pressable
              onPress={() =>
                setShowCurrentPassword(!showCurrentPassword)
              }
              hitSlop={10}
            >
              <Ionicons
                name={
                  showCurrentPassword
                    ? 'eye-off-outline'
                    : 'eye-outline'
                }
                size={19}
                color="#64748B"
              />
            </Pressable>
          </View>

          {/* New Password */}
          <Text style={styles.label}>New Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="New password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <Pressable
              onPress={() =>
                setShowNewPassword(!showNewPassword)
              }
              hitSlop={10}
            >
              <Ionicons
                name={
                  showNewPassword
                    ? 'eye-off-outline'
                    : 'eye-outline'
                }
                size={19}
                color="#64748B"
              />
            </Pressable>
          </View>

          {/* Form Buttons */}
          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Ionicons
                name="close"
                size={15}
                color="#142D4E"
              />

              <Text style={styles.cancelButtonText}>
                Cancel
              </Text>
            </Pressable>

            <Pressable
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Ionicons
                name="checkmark"
                size={15}
                color="#FFFFFF"
              />

              <Text style={styles.saveButtonText}>
                Save Changes
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Logout */}
        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={18}
            color="#FFFFFF"
          />

          <Text style={styles.logoutButtonText}>
            Cerrar sesión
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 15,
    paddingTop: 7,
    paddingBottom: 25,
  },
  heading: {
    color: '#142D4E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#718096',
    fontSize: 12,
    marginTop: 3,
    marginBottom: 12,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 13,
    marginBottom: 12,
    elevation: 2,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 25,
    backgroundColor: '#E21B2D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userMainInfo: {
    flex: 1,
  },
  userName: {
    color: '#142D4E',
    fontSize: 15,
    fontWeight: 'bold',
  },
  roleBadge: {
    backgroundColor: '#FCE7EB',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  roleBadgeText: {
    color: '#D71929',
    fontSize: 9,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E7EDF5',
    paddingVertical: 9,
  },
  infoIcon: {
    width: 23,
  },
  infoLabel: {
    color: '#142D4E',
    fontSize: 10,
    fontWeight: 'bold',
    width: 85,
  },
  infoValue: {
    flex: 1,
    color: '#475569',
    fontSize: 10,
    textAlign: 'right',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 13,
    elevation: 2,
  },
  formTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 13,
  },
  formTitle: {
    color: '#142D4E',
    fontSize: 15,
    fontWeight: 'bold',
  },
  label: {
    color: '#142D4E',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 39,
    borderWidth: 1,
    borderColor: '#CBD8E9',
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    paddingHorizontal: 10,
    color: '#142D4E',
    fontSize: 11,
    marginBottom: 11,
  },
  passwordContainer: {
    height: 39,
    borderWidth: 1,
    borderColor: '#CBD8E9',
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
  },
  passwordInput: {
    flex: 1,
    color: '#142D4E',
    fontSize: 11,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 5,
  },
  cancelButton: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#64748B',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  cancelButtonText: {
    color: '#142D4E',
    fontSize: 11,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1.4,
    height: 40,
    backgroundColor: '#D71929',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#142D4E',
    borderRadius: 9,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
    marginTop: 12,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
