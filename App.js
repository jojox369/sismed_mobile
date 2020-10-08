import React from 'react';
import MainStack from './src/routers/login.auth.routes';
import {NavigationContainer} from '@react-navigation/native';
import UserContextProvider from './src/contexts/UserContext';
import FlashMessage from 'react-native-flash-message';
export default () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <MainStack />
        <FlashMessage
          position="top"
          style={{alignItems: 'center', justifyContent: 'center'}}
          duration={3000}
        />
      </NavigationContainer>
    </UserContextProvider>
  );
};
