
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const AppHeader = ({ onProfilePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brand}>
          <MaterialCommunityIcons
            name="monitor"
            size={30}
            color="#FFFFFF"
            style={styles.logo}
          />
          <Text style={styles.title}>LabControl</Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.notification}>
            <Ionicons
              name="notifications-outline"
              size={25}
              color="#FFFFFF"
            />
            <View style={styles.dot} />
          </Pressable>

          <Pressable style={styles.profile} onPress={onProfilePress}>
            <Ionicons
              name="person"
              size={19}
              color="#FFFFFF"
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.redWave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 85,
    backgroundColor: '#142D4E',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    zIndex: 2,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginRight: 7,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notification: {
    position: 'relative',
    padding: 5,
  },
  dot: {
    position: 'absolute',
    right: 3,
    top: 3,
    width: 7,
    height: 7,
    backgroundColor: '#E21B2D',
    borderRadius: 5,
  },
  profile: {
    width: 40,
    height: 40,
    backgroundColor: '#E21B2D',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redWave: {
    position: 'absolute',
    height: 35,
    width: '110%',
    bottom: -24,
    left: -10,
    backgroundColor: '#E21B2D',
    borderRadius: 100,
    transform: [{ rotate: '-3deg' }],
  },
});

export default AppHeader;
