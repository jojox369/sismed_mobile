import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Agenda from '../screens/Agenda';
import Paciente from '../screens/Paciente';
import RegistroClinico from '../screens/RegistroClinico';
import Exame from '../screens/Exame';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator>
    <Tab.Screen name="home" component={Home} />
    <Tab.Screen name="Agenda" component={Agenda} />
    <Tab.Screen name="Paciente" component={Paciente} />
    <Tab.Screen name="RegistroClinico" component={RegistroClinico} />
    <Tab.Screen name="Exame" component={Exame} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);