import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Exam from '../screens/Exam/List';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Exam" component={Exam} />
  </Stack.Navigator>
);
