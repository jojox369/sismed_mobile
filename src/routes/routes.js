import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SismedRoutes from './sismed.routes';
import Login from '../pages/user';

const Stack = createStackNavigator();
export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="User"
      screenOptions={{
        headerStyle: {backgroundColor: '#0087cd'},
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Home"
        component={SismedRoutes}
        options={{title: 'SISMED'}}
      />

      <Stack.Screen name="User" component={Login} options={{title: 'SISMED'}} />
    </Stack.Navigator>
  );
}
