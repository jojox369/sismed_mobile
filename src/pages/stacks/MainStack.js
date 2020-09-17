import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Preload from '../Preload';
import SignIn from '../SignIn';
import ForgotPassword from '../ForgotPassword';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="PreLoad" component={Preload} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);
