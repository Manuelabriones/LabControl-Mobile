
import { View, Text, StyleSheet } from 'react-native';

const AuthHero = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.monitor}>
          <View style={styles.screen}>
            <View style={styles.screenReflection} />
          </View>
          <View style={styles.monitorBase} />
          <View style={styles.laptopBase} />
        </View>

        <Text style={styles.title}>LabControl</Text>

        <Text style={styles.subtitle}>
          Computer Laboratory
        </Text>
        <Text style={styles.subtitle}>
          Management System
        </Text>
      </View>

      <View style={styles.redWave} />
      <View style={styles.darkWave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 265,
    backgroundColor: '#142D4E',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingTop: 25,
  },
  content: {
    alignItems: 'center',
    zIndex: 2,
  },
  monitor: {
    alignItems: 'center',
    marginBottom: 8,
  },
  screen: {
    width: 92,
    height: 65,
    backgroundColor: '#243E5D',
    borderWidth: 4,
    borderColor: '#E6EDF7',
    borderRadius: 5,
    overflow: 'hidden',
    transform: [{ skewX: '-7deg' }],
  },
  screenReflection: {
    width: 110,
    height: 20,
    backgroundColor: '#49627D',
    opacity: 0.5,
    transform: [{ rotate: '-20deg' }],
    marginTop: 10,
    marginLeft: -10,
  },
  monitorBase: {
    width: 35,
    height: 5,
    backgroundColor: '#DCE7F5',
  },
  laptopBase: {
    width: 112,
    height: 7,
    backgroundColor: '#DCE7F5',
    borderRadius: 3,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 2,
  },
  subtitle: {
    color: '#DCE7F5',
    fontSize: 12,
    lineHeight: 17,
  },
  redWave: {
    position: 'absolute',
    height: 65,
    width: '120%',
    bottom: -28,
    left: -15,
    backgroundColor: '#E21B2D',
    borderRadius: 100,
    transform: [{ rotate: '-9deg' }],
  },
  darkWave: {
    position: 'absolute',
    height: 55,
    width: '120%',
    bottom: -48,
    right: -25,
    backgroundColor: '#142D4E',
    borderRadius: 100,
    transform: [{ rotate: '-8deg' }],
  },
});

export default AuthHero;
