import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import DialogBoxDemo from '../screens/DialogBoxDemo';
import {Icon} from '@ui-kitten/components';
import FormDemo from '../screens/FormDemo';
import ListRentalZ from '../screens/ListRentalZ';

const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon style={styles.icon} fill={color} name="home-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="DialogBoxDemo"
        component={DialogBoxDemo}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon style={styles.icon} fill={color} name="archive-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="FormDemo"
        component={FormDemo}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon style={styles.icon} fill={color} name="file-text-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="ListRentalZ"
        component={ListRentalZ}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon style={styles.icon} fill={color} name="people-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
