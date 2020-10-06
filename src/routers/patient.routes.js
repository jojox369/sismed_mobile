import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Patient from '../screens/Patient/List';
import ClinicalRecord from '../screens/ClinicalRecord/List';
import PatientDetails from '../screens/Patient/Details';
import PatientExams from '../screens/Patient/Exams';
import ExamDetails from '../screens/Exam/Details';
const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Patient" component={Patient} />
    <Stack.Screen name="ClinicalRecord" component={ClinicalRecord} />
    <Stack.Screen name="PatientDetails" component={PatientDetails} />
    <Stack.Screen name="PatientExams" component={PatientExams} />
    <Stack.Screen name="ExamDetails" component={ExamDetails} />
  </Stack.Navigator>
);
