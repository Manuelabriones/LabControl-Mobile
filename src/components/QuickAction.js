
import { Pressable, View, Text, StyleSheet } from 'react-native';

const QuickAction = ({ icon, title, subtitle, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.icon}>{icon}</Text>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 78,
    backgroundColor: '#FFF5F6',
    borderWidth: 1,
    borderColor: '#F5A7B0',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    marginHorizontal: 3,
  },
  icon: {
    fontSize: 23,
    color: '#C91C30',
    marginBottom: 5,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 11,
    color: '#B91C31',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 11,
    color: '#B91C31',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default QuickAction;
