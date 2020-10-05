import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Schedule from '../screens/Schedule/List';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Schedule" component={Schedule} />
  </Stack.Navigator>
);
