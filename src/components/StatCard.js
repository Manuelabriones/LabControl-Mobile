
import { View, Text, StyleSheet } from 'react-native';

const StatCard = ({ icon, value, label, color, background }) => {
  return (
    <View style={[styles.card, { backgroundColor: background, borderColor: color }]}>
      <Text style={[styles.icon, { color }]}>{icon}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 88,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    marginBottom: 9,
  },
  icon: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  value: {
    color: '#142D4E',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },
  label: {
    color: '#334155',
    fontSize: 11,
    marginTop: 1,
  },
});

export default StatCard;
