import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Patient from '../screens/Patient/List';
import ClinicalRecord from '../screens/ClinicalRecord/List';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Patient" component={Patient} />
  </Stack.Navigator>
);
