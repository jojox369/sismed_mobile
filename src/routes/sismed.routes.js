import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Agenda from '../pages/agenda';
import Pacientes from '../pages/pacientes';
import Exames from '../pages/exames';

const Tab = createBottomTabNavigator();

export default function SismedRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Agenda" component={Agenda} />
      <Tab.Screen name="Pacientes" component={Pacientes} />
      <Tab.Screen name="Exames" component={Exames} />
    </Tab.Navigator>
  );
}
