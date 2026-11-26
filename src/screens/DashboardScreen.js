
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';

import AppHeader from '../components/AppHeader';

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();

  const userName =
    user?.nombre ??
    user?.name ??
    user?.fullName ??
    'Usuario';

  // Acciones rápidas
  const handleAction = (screen) => {
    if (screen === 'Laboratories') {
      navigation.navigate('Labs');
    } else if (screen === 'Assignments') {
      // La pantalla de asignación se integrará próximamente
      alert('La pantalla de asignación de equipos se integrará próximamente.');
    } else if (screen === 'Active Session') {
      navigation.navigate('Session');
    } else if (screen === 'My Profile') {
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        onProfilePress={() => handleAction('My Profile')}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Home</Text>
        <Text style={styles.subtitle}>System Dashboard</Text>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeText}>
            <Text style={styles.welcomeTitle}>
              Welcome, {userName}!
            </Text>

            <Text style={styles.welcomeDescription}>
              Manage laboratories, equipment and assignments from a single place.
            </Text>
          </View>

          <View style={styles.computerIllustration}>
            <Ionicons
              name="laptop-outline"
              size={48}
              color="#C91C30"
            />
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          {/* Total Computers */}
          <View style={[styles.statCard, styles.totalCard]}>
            <Ionicons
              name="desktop-outline"
              size={23}
              color="#8BAFE5"
            />

            <Text style={styles.statValue}>20</Text>
            <Text style={styles.statLabel}>Total Computers</Text>
          </View>

          {/* Available */}
          <View style={[styles.statCard, styles.availableCard]}>
            <Ionicons
              name="checkmark-circle"
              size={23}
              color="#39B978"
            />

            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>

          {/* Occupied */}
          <View style={[styles.statCard, styles.occupiedCard]}>
            <Ionicons
              name="close-circle"
              size={23}
              color="#E85B70"
            />

            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Occupied</Text>
          </View>

          {/* Maintenance */}
          <View style={[styles.statCard, styles.maintenanceCard]}>
            <Ionicons
              name="construct"
              size={23}
              color="#D69A24"
            />

            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>In Maintenance</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Ionicons
            name="flash"
            size={23}
            color="#E21B2D"
          />

          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          {/* View Laboratories */}
          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.actionPressed,
            ]}
            onPress={() => handleAction('Laboratories')}
          >
            <Ionicons
              name="desktop-outline"
              size={25}
              color="#D71929"
            />

            <Text style={styles.actionTitle}>View</Text>
            <Text style={styles.actionSubtitle}>Laboratories</Text>
          </Pressable>

          {/* Assign Equipment */}
          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.actionPressed,
            ]}
            onPress={() => handleAction('Assignments')}
          >
            <MaterialCommunityIcons
              name="account-plus-outline"
              size={25}
              color="#D71929"
            />

            <Text style={styles.actionTitle}>Assign</Text>
            <Text style={styles.actionSubtitle}>Equipment</Text>
          </Pressable>

          {/* My Active Session */}
          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.actionPressed,
            ]}
            onPress={() => handleAction('Active Session')}
          >
            <Ionicons
              name="time-outline"
              size={25}
              color="#D71929"
            />

            <Text style={styles.actionTitle}>My Active</Text>
            <Text style={styles.actionSubtitle}>Session</Text>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 25,
  },
  heading: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#142D4E',
  },
  subtitle: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
    marginBottom: 9,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D5E0EF',
    padding: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    elevation: 2,
  },
  welcomeText: {
    flex: 1,
    paddingRight: 8,
  },
  welcomeTitle: {
    color: '#142D4E',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  welcomeDescription: {
    color: '#718096',
    fontSize: 10,
    lineHeight: 14,
  },
  computerIllustration: {
    width: 68,
    height: 57,
    backgroundColor: '#FCEBF0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48.5%',
    minHeight: 105,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 9,
    paddingVertical: 10,
  },
  totalCard: {
    backgroundColor: '#F5F8FF',
    borderColor: '#9DBCEB',
  },
  availableCard: {
    backgroundColor: '#EAF8EF',
    borderColor: '#62C68D',
  },
  occupiedCard: {
    backgroundColor: '#FFF0F2',
    borderColor: '#F28B9B',
  },
  maintenanceCard: {
    backgroundColor: '#FFF8E5',
    borderColor: '#E9BB55',
  },
  statValue: {
    color: '#142D4E',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 3,
  },
  statLabel: {
    color: '#334155',
    fontSize: 10,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
    gap: 6,
  },
  sectionTitle: {
    color: '#142D4E',
    fontSize: 15,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 7,
  },
  actionCard: {
    flex: 1,
    minHeight: 88,
    backgroundColor: '#FFF5F6',
    borderWidth: 1,
    borderColor: '#F5A0AC',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 3,
  },
  actionPressed: {
    backgroundColor: '#FCE0E5',
    opacity: 0.8,
  },
  actionTitle: {
    color: '#C91C30',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 7,
  },
  actionSubtitle: {
    color: '#C91C30',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
    textAlign: 'center',
  },
});

export default DashboardScreen;
