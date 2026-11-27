
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/DashboardScreen';
import LaboratoriesScreen from '../screens/LaboratoriesScreen';
import ActiveSessionScreen from '../screens/ActiveSessionScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Iconos de navegación
const TabIcon = ({ name, color, size }) => (
  <Ionicons name={name} size={size || 24} color={color} />
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#142D4E',
        tabBarActiveBackgroundColor: '#E21B2D',
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon name="home-outline" color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Labs"
        component={LaboratoriesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon name="desktop-outline" color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Session"
        component={ActiveSessionScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon name="time-outline" color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon name="person-outline" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = {
  tabBar: {
    height: 72,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#142D4E',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -3 },
    paddingHorizontal: 8,
    paddingTop: 5,
    paddingBottom: 7,
  },
  tabItem: {
    borderRadius: 13,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
};

export default BottomTabNavigator;
