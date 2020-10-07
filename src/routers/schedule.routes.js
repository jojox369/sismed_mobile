import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Schedule from '../screens/Schedule/List';
import ScheduleDetails from '../screens/Schedule/Details';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Schedule" component={Schedule} />
    <Stack.Screen name="ScheduleDetails" component={ScheduleDetails} />
  </Stack.Navigator>
);
