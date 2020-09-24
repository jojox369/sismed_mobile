import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Schedule from '../screens/Schedule/List';
import Patient from '../screens/Patient/List';
import ClinicalRecord from '../screens/ClinicalRecord/List';
import Exam from '../screens/Exam/List';
import Profile from '../screens/Profile';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Patient" component={Patient} />
    <Tab.Screen name="Schedule" component={Schedule} />
    <Tab.Screen name="Exam" component={Exam} />
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="ClinicalRecord" component={ClinicalRecord} />
  </Tab.Navigator>
);
