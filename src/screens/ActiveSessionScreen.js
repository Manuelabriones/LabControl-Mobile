
import { useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import AppHeader from '../components/AppHeader';

const ActiveSessionScreen = ({ navigation }) => {
  const [reportIssue, setReportIssue] = useState(false);
  const [issueDescription, setIssueDescription] = useState('');

  // Reportar problema
  const handleReport = () => {
    if (!issueDescription.trim()) {
      Alert.alert(
        'Required field',
        'Please describe the issue.'
      );
      return;
    }

    Alert.alert(
      'Report',
      'La conexión para registrar el problema se integrará con la API.'
    );
  };

  // Liberar equipo
  const handleRelease = () => {
    Alert.alert(
      'Release Equipment',
      '¿Deseas liberar el equipo?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Release',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Pending connection',
              'La liberación del equipo se conectará con la API.'
            );
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
        <Text style={styles.heading}>My Active Session</Text>

        <Text style={styles.subtitle}>
          Assigned computer information
        </Text>

        {/* Assigned Computer */}
        <View style={styles.card}>
          <View style={styles.activeBanner}>
            <Ionicons
              name="desktop-outline"
              size={23}
              color="#159447"
            />

            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>
                You have an assigned computer
              </Text>
            </View>

            <View style={styles.inUseBadge}>
              <View style={styles.statusDot} />

              <Text style={styles.inUse}>
                In Use
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="desktop-outline"
              size={15}
              color="#142D4E"
              style={styles.infoIcon}
            />

            <Text style={styles.infoLabel}>Computer:</Text>

            <Text style={styles.infoValue}>
              UTR-PC-02
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="flask-outline"
              size={15}
              color="#142D4E"
              style={styles.infoIcon}
            />

            <Text style={styles.infoLabel}>Laboratory:</Text>

            <Text style={styles.infoValue}>
              Lab-A
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="book-outline"
              size={15}
              color="#142D4E"
              style={styles.infoIcon}
            />

            <Text style={styles.infoLabel}>Subject:</Text>

            <Text style={styles.infoValue}>
              Web Development
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="calendar-outline"
              size={15}
              color="#142D4E"
              style={styles.infoIcon}
            />

            <Text style={styles.infoLabel}>Start Time:</Text>

            <Text style={styles.infoValue}>
              2026-11-18 09:00
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="time-outline"
              size={15}
              color="#142D4E"
              style={styles.infoIcon}
            />

            <Text style={styles.infoLabel}>Usage Time:</Text>

            <Text style={styles.infoValue}>
              2 hours
            </Text>
          </View>
        </View>

        {/* Release Equipment */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="log-out-outline"
              size={19}
              color="#142D4E"
            />

            <Text style={styles.sectionTitle}>
              Release Equipment
            </Text>
          </View>

          {/* Report Issue Checkbox */}
          <Pressable
            style={styles.checkboxRow}
            onPress={() => {
              setReportIssue(!reportIssue);

              if (reportIssue) {
                setIssueDescription('');
              }
            }}
          >
            <View
              style={[
                styles.checkbox,
                reportIssue && styles.checkboxActive,
              ]}
            >
              {reportIssue && (
                <Ionicons
                  name="checkmark"
                  size={13}
                  color="#FFFFFF"
                />
              )}
            </View>

            <Text style={styles.checkboxText}>
              Report an equipment issue
            </Text>
          </Pressable>

          {/* Issue Description */}
          {reportIssue && (
            <View>
              <Text style={styles.label}>
                Issue Description *
              </Text>

              <TextInput
                style={styles.textArea}
                placeholder="Describe the problem found..."
                placeholderTextColor="#94A3B8"
                multiline
                maxLength={200}
                textAlignVertical="top"
                value={issueDescription}
                onChangeText={setIssueDescription}
              />

              <Text style={styles.characterCount}>
                {issueDescription.length}/200
              </Text>

              <Pressable
                style={styles.reportButton}
                onPress={handleReport}
              >
                <Ionicons
                  name="alert-circle-outline"
                  size={17}
                  color="#FFFFFF"
                />

                <Text style={styles.buttonText}>
                  Report Issue
                </Text>
              </Pressable>
            </View>
          )}

          {/* Release Button */}
          <Pressable
            style={styles.releaseButton}
            onPress={handleRelease}
          >
            <Ionicons
              name="power-outline"
              size={18}
              color="#FFFFFF"
            />

            <Text style={styles.buttonText}>
              Release Equipment
            </Text>
          </Pressable>
        </View>
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
    paddingTop: 8,
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 13,
    marginBottom: 12,
    elevation: 2,
  },
  activeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1F7E8',
    padding: 10,
    borderRadius: 9,
    marginBottom: 10,
    gap: 8,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    color: '#24553A',
    fontSize: 10,
    fontWeight: 'bold',
  },
  inUseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C9F2D5',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#168344',
  },
  inUse: {
    color: '#168344',
    fontSize: 9,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#E7EDF5',
  },
  infoIcon: {
    width: 23,
  },
  infoLabel: {
    width: '37%',
    color: '#142D4E',
    fontSize: 11,
    fontWeight: '600',
  },
  infoValue: {
    flex: 1,
    color: '#475569',
    fontSize: 11,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#142D4E',
    fontSize: 15,
    fontWeight: 'bold',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: '#94A3B8',
    borderRadius: 3,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#142D4E',
    borderColor: '#142D4E',
  },
  checkboxText: {
    color: '#334155',
    fontSize: 11,
  },
  label: {
    color: '#142D4E',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  textArea: {
    minHeight: 85,
    borderWidth: 1,
    borderColor: '#CBD8E9',
    borderRadius: 8,
    padding: 10,
    color: '#142D4E',
    fontSize: 11,
    backgroundColor: '#F8FAFC',
  },
  characterCount: {
    color: '#718096',
    fontSize: 9,
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 8,
  },
  reportButton: {
    backgroundColor: '#E9A12B',
    padding: 11,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  releaseButton: {
    backgroundColor: '#D71929',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
    marginTop: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ActiveSessionScreen;
