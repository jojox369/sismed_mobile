import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Agenda from '../screens/Agenda';
import Paciente from '../screens/Paciente';
import RegistroClinico from '../screens/RegistroClinico';
import Exame from '../screens/Exame';
import Profile from '../screens/Profile';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Paciente" component={Paciente} />
    <Tab.Screen name="Agenda" component={Agenda} />
    <Tab.Screen name="Exame" component={Exame} />
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="RegistroClinico" component={RegistroClinico} />
  </Tab.Navigator>
);
