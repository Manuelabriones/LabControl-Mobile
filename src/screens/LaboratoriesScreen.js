
import { useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import AppHeader from '../components/AppHeader';

const laboratories = ['Lab-A', 'Lab-B', 'Networks'];

// Datos de muestra de las computadoras
const computers = [
  {
    id: 'UTR-PC-01',
    processor: 'Core i7',
    ram: '16 GB',
    lab: 'Lab-A',
    status: 'Available',
  },
  {
    id: 'UTR-PC-02',
    processor: 'Core i5',
    ram: '8 GB',
    lab: 'Lab-A',
    status: 'Occupied',
  },
  {
    id: 'UTR-PC-03',
    processor: 'Core i7',
    ram: '16 GB',
    lab: 'Lab-A',
    status: 'Maintenance',
  },
  {
    id: 'UTR-PC-04',
    processor: 'Core i5',
    ram: '8 GB',
    lab: 'Lab-A',
    status: 'Available',
  },
  {
    id: 'UTR-PC-05',
    processor: 'Core i7',
    ram: '16 GB',
    lab: 'Lab-B',
    status: 'Occupied',
  },
  {
    id: 'UTR-PC-06',
    processor: 'Core i5',
    ram: '8 GB',
    lab: 'Lab-B',
    status: 'Available',
  },
];

const LaboratoriesScreen = ({ navigation }) => {
  const [selectedLab, setSelectedLab] = useState('Lab-A');

  // Filtrar computadoras por laboratorio
  const filteredComputers =
    selectedLab === 'Networks'
      ? computers
      : computers.filter(
          (computer) => computer.lab === selectedLab
        );

  // Equipment Statistics
  const available = filteredComputers.filter(
    (computer) => computer.status === 'Available'
  ).length;

  const occupied = filteredComputers.filter(
    (computer) => computer.status === 'Occupied'
  ).length;

  const maintenance = filteredComputers.filter(
    (computer) => computer.status === 'Maintenance'
  ).length;

  // Obtener color del estado
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Available':
        return styles.availableStatus;

      case 'Occupied':
        return styles.occupiedStatus;

      case 'Maintenance':
        return styles.maintenanceStatus;

      default:
        return styles.availableStatus;
    }
  };

  // Obtener icono del laboratorio
  const getLaboratoryIcon = (lab) => {
    if (lab === 'Networks') {
      return 'layers-outline';
    }

    return 'desktop-outline';
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
      >
        <Text style={styles.heading}>
          Computer Laboratories
        </Text>

        <Text style={styles.subtitle}>
          Equipment map and overview
        </Text>

        {/* Laboratory Selector */}
        <View style={styles.selectorCard}>
          <View style={styles.selectorTitleContainer}>
            <MaterialCommunityIcons
              name="flask-outline"
              size={19}
              color="#142D4E"
            />

            <Text style={styles.selectorTitle}>
              Select a Laboratory
            </Text>
          </View>

          <View style={styles.labButtons}>
            {laboratories.map((lab) => (
              <Pressable
                key={lab}
                style={[
                  styles.labButton,
                  selectedLab === lab && styles.labButtonActive,
                ]}
                onPress={() => setSelectedLab(lab)}
              >
                <View style={styles.labButtonContent}>
                  <Ionicons
                    name={getLaboratoryIcon(lab)}
                    size={16}
                    color={
                      selectedLab === lab
                        ? '#FFFFFF'
                        : '#142D4E'
                    }
                  />

                  <Text
                    style={[
                      styles.labButtonText,
                      selectedLab === lab &&
                        styles.labButtonTextActive,
                    ]}
                  >
                    {lab}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Equipment Statistics */}
          <View style={styles.statistics}>
            <View style={[styles.statBox, styles.availableBox]}>
              <View style={styles.statLabelContainer}>
                <Ionicons
                  name="checkmark-circle"
                  size={13}
                  color="#168A4A"
                />

                <Text style={styles.statLabel}>
                  Available
                </Text>
              </View>

              <Text style={styles.statValue}>
                {available}
              </Text>
            </View>

            <View style={[styles.statBox, styles.occupiedBox]}>
              <View style={styles.statLabelContainer}>
                <Ionicons
                  name="close-circle"
                  size={13}
                  color="#D71929"
                />

                <Text style={styles.statLabel}>
                  Occupied
                </Text>
              </View>

              <Text style={styles.statValue}>
                {occupied}
              </Text>
            </View>

            <View style={[styles.statBox, styles.maintenanceBox]}>
              <View style={styles.statLabelContainer}>
                <Ionicons
                  name="construct"
                  size={13}
                  color="#B7791F"
                />

                <Text style={styles.statLabel}>
                  Maintenance
                </Text>
              </View>

              <Text style={styles.statValue}>
                {maintenance}
              </Text>
            </View>
          </View>
        </View>

        {/* Computer Cards */}
        <View style={styles.computerGrid}>
          {filteredComputers.map((computer) => (
            <View
              key={computer.id}
              style={styles.computerCard}
            >
              <View style={styles.computerIconContainer}>
                <Ionicons
                  name="desktop-outline"
                  size={25}
                  color="#D71929"
                />
              </View>

              <View style={styles.computerInfo}>
                <Text style={styles.computerName}>
                  {computer.id}
                </Text>

                <Text style={styles.computerDetail}>
                  {computer.processor} · {computer.ram}
                </Text>

                <Text style={styles.computerDetail}>
                  {computer.lab}
                </Text>

                <View style={styles.statusContainer}>
                  <View
                    style={[
                      styles.statusBadge,
                      getStatusStyle(computer.status),
                    ]}
                  >
                    <Ionicons
                      name={
                        computer.status === 'Available'
                          ? 'checkmark-circle'
                          : computer.status === 'Occupied'
                            ? 'close-circle'
                            : 'construct'
                      }
                      size={11}
                      color={
                        computer.status === 'Available'
                          ? '#168A4A'
                          : computer.status === 'Occupied'
                            ? '#D71929'
                            : '#B7791F'
                      }
                    />

                    <Text style={styles.statusText}>
                      {computer.status}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {filteredComputers.length === 0 && (
          <Text style={styles.emptyText}>
            No computers available in this laboratory.
          </Text>
        )}
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
    paddingBottom: 20,
  },
  heading: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#142D4E',
  },
  subtitle: {
    fontSize: 12,
    color: '#718096',
    marginTop: 3,
    marginBottom: 12,
  },
  selectorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  selectorTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  selectorTitle: {
    color: '#142D4E',
    fontSize: 14,
    fontWeight: 'bold',
  },
  labButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 12,
  },
  labButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCE3ED',
  },
  labButtonActive: {
    backgroundColor: '#D71929',
    borderColor: '#D71929',
  },
  labButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  labButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#142D4E',
  },
  labButtonTextActive: {
    color: '#FFFFFF',
  },
  statistics: {
    flexDirection: 'row',
    gap: 6,
  },
  statBox: {
    flex: 1,
    borderRadius: 9,
    paddingVertical: 9,
    alignItems: 'center',
  },
  availableBox: {
    backgroundColor: '#E3F7EA',
  },
  occupiedBox: {
    backgroundColor: '#FCE7EB',
  },
  maintenanceBox: {
    backgroundColor: '#FFF3D6',
  },
  statLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    color: '#334155',
    fontSize: 9,
    fontWeight: '600',
  },
  statValue: {
    color: '#142D4E',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  computerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  computerCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    padding: 9,
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 1,
    minHeight: 88,
  },
  computerIconContainer: {
    width: 32,
    height: 34,
    backgroundColor: '#FCE8ED',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },
  computerInfo: {
    flex: 1,
  },
  computerName: {
    color: '#142D4E',
    fontSize: 11,
    fontWeight: 'bold',
  },
  computerDetail: {
    color: '#64748B',
    fontSize: 9,
    marginTop: 3,
  },
  statusContainer: {
    alignItems: 'flex-start',
    marginTop: 6,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  availableStatus: {
    backgroundColor: '#D9F6E3',
  },
  occupiedStatus: {
    backgroundColor: '#FCE0E5',
  },
  maintenanceStatus: {
    backgroundColor: '#FFF0C9',
  },
  statusText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#334155',
  },
  emptyText: {
    textAlign: 'center',
    color: '#718096',
    marginTop: 25,
  },
});

export default LaboratoriesScreen;
