import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Schedule from './schedule.routes';
import Patient from './patient.routes';
import Exam from './exam.routes';
import Profile from './profile.routes';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Patient" component={Patient} />
    <Tab.Screen name="Schedule" component={Schedule} />
    <Tab.Screen name="Exam" component={Exam} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);
