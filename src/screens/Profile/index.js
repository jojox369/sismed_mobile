import React, {useEffect} from 'react';
import {Container} from './styles';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.removeItem('token');
  });

  return (
    <Container>
      <Text>Profile Page</Text>
    </Container>
  );
};
